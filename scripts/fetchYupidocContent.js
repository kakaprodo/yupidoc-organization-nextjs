const dotenv = require("dotenv");
const { writeFile } = require("node:fs/promises");
const { join } = require("node:path");
const zlib = require("node:zlib");
const sharp = require("sharp");
const pngToIco = require("png-to-ico");

dotenv.config({
    path: join(process.cwd(), ".env"),
});

async function extractTextFromGzip(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const decompressed = zlib.gunzipSync(buffer);

    return decompressed.toString("utf8");
}

async function main() {
    const args = process.argv.slice(2);

    const isProductionMode = args.includes("--prod");

    // Dynamic values
    const organizationId = process.env.YUPIDOC_PROJECT_ID;
    const domainPublicKey = process.env.YUPIDOC_PUBLIC_KEY;

    const url = !isProductionMode
        ? `${process.env.YUPIDOC_IMAGE_BASE_PATH}/44-pk-d60bcff4-ad48-4982-beda-238057a6fe5b.gz`
        : `${process.env.YUPIDOC_IMAGE_BASE_PATH}/${organizationId}-${domainPublicKey}.gz`;

    console.log(`Fetching from: ${url}`);
    let organization = null;

    try {
        const text = await extractTextFromGzip(url);
        const allContents = JSON.parse(text);

        organization = allContents.organization;

        // Group section_contents by type
        allContents.section_contents = (
            allContents.section_contents || []
        ).reduce((acc, item) => {
            const type = item.key;

            if (!acc[type]) {
                acc[type] = [];
            }

            acc[type].push(item);

            return acc;
        }, {});

        const outputPath = join(
            process.cwd(),
            "scripts",
            "training-center-contents.json",
        );

        await writeFile(
            outputPath,
            JSON.stringify(allContents, null, 2),
            "utf8",
        );

        console.log("\nDATA SYNC COMPLETED");
    } catch (error) {
        console.error("ERROR:", error);
    }

    // generate a favicon from organization logo_url
    if (
        organization &&
        organization?.logo_url != undefined &&
        organization?.logo_url != null
    ) {
        await generateFavicon(organization?.logo_url);
    }
}

/**
 * Convert image URL to favicon ICO and save it locally
 * @param {string} imageUrl - Source image URL
 */
async function generateFavicon(imageUrl) {
    console.log(`***Generating favicon from: ${imageUrl}***`);

    try {
        const response = await fetch(imageUrl);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch logo: ${response.status} ${response.statusText}`,
            );
        }

        const contentType = response.headers.get("content-type") || "";
        const buffer = Buffer.from(await response.arrayBuffer());

        const outputPath = join(
            process.cwd(),
            "public",
            "favicon",
            "yupidoc.png",
        );

        // ✅ If already PNG, skip processing (no resize, no conversion)
        if (contentType.includes("image/png")) {
            console.log("Image is already PNG, saving directly...");

            await require("fs").promises.writeFile(outputPath, buffer);

            return outputPath;
        }

        // 🧠 Otherwise process image
        await sharp(buffer)
            .resize(256, 256, {
                //fit: "cover", // ✅ removes padding (fills instead of letterbox)
                // position: "center",
            })
            .png()
            .toFile(outputPath);

        console.log("Favicon created at:", outputPath);

        return outputPath;
    } catch (error) {
        console.error("Favicon generation failed:", error.message);
    }
}

main();

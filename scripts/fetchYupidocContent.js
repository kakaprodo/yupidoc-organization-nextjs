const dotenv = require("dotenv");
const { writeFile } = require("node:fs/promises");
const { join } = require("node:path");
const zlib = require("node:zlib");

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

    try {
        const text = await extractTextFromGzip(url);
        const allContents = JSON.parse(text);

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
}

main();

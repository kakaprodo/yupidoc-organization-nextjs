import { ImageResponse } from 'next/og';

// Configuration de l'icône
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Le design de votre icône (identique à votre code Header)
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 20,
                    background: '#5850ec',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '8px', // Correspond à rounded-lg
                }}
            >
                {/* SVG simplifié de la GraduationCap (Lucide) */}
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
            </div>
        ),
        { ...size }
    );
}
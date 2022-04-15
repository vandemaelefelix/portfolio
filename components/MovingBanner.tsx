import styles from '../styles/components/MovingBanner.module.css';

interface Props {
    title?: string;
    direction?: number;
}

export default function MovingBanner({ title = 'placeholder', direction = 0 }: Props) {
    return (
        <div className={`${styles.banner}`}>
            <div className={`${styles.bannerContent} ${direction === 1 ? styles.inverted : ''}`}>
                <svg className={`${styles.bannerIcon}`} viewBox="0 0 134.46 134.46">
                    <path
                        d="M0,0C23.477,23.477,70.047,24.356,94.4,0c-24.364,24.364-27.628,68.124,0,95.752-28.039-28.039-68.966-25.438-94.4,0C25.258,70.494,23.457,23.457,0,0Z"
                        transform="translate(67.707) rotate(45)"
                    />
                </svg>
                <h1 className={`${styles.bannerText}`}>{title}</h1>
                <svg className={`${styles.bannerIcon}`} viewBox="0 0 134.46 134.46">
                    <path
                        d="M0,0C23.477,23.477,70.047,24.356,94.4,0c-24.364,24.364-27.628,68.124,0,95.752-28.039-28.039-68.966-25.438-94.4,0C25.258,70.494,23.457,23.457,0,0Z"
                        transform="translate(67.707) rotate(45)"
                    />
                </svg>
                <h1 className={`${styles.bannerText}`}>{title}</h1>
                <svg className={`${styles.bannerIcon}`} viewBox="0 0 134.46 134.46">
                    <path
                        d="M0,0C23.477,23.477,70.047,24.356,94.4,0c-24.364,24.364-27.628,68.124,0,95.752-28.039-28.039-68.966-25.438-94.4,0C25.258,70.494,23.457,23.457,0,0Z"
                        transform="translate(67.707) rotate(45)"
                    />
                </svg>
                <h1 className={`${styles.bannerText}`}>{title}</h1>
            </div>

            <div className={`${styles.bannerContent} ${direction === 1 ? styles.inverted : ''}`}>
                <svg className={`${styles.bannerIcon}`} viewBox="0 0 134.46 134.46">
                    <path
                        d="M0,0C23.477,23.477,70.047,24.356,94.4,0c-24.364,24.364-27.628,68.124,0,95.752-28.039-28.039-68.966-25.438-94.4,0C25.258,70.494,23.457,23.457,0,0Z"
                        transform="translate(67.707) rotate(45)"
                    />
                </svg>
                <h1 className={`${styles.bannerText}`}>{title}</h1>
                <svg className={`${styles.bannerIcon}`} viewBox="0 0 134.46 134.46">
                    <path
                        d="M0,0C23.477,23.477,70.047,24.356,94.4,0c-24.364,24.364-27.628,68.124,0,95.752-28.039-28.039-68.966-25.438-94.4,0C25.258,70.494,23.457,23.457,0,0Z"
                        transform="translate(67.707) rotate(45)"
                    />
                </svg>
                <h1 className={`${styles.bannerText}`}>{title}</h1>
                <svg className={`${styles.bannerIcon}`} viewBox="0 0 134.46 134.46">
                    <path
                        d="M0,0C23.477,23.477,70.047,24.356,94.4,0c-24.364,24.364-27.628,68.124,0,95.752-28.039-28.039-68.966-25.438-94.4,0C25.258,70.494,23.457,23.457,0,0Z"
                        transform="translate(67.707) rotate(45)"
                    />
                </svg>
                <h1 className={`${styles.bannerText}`}>{title}</h1>
            </div>
        </div>
    );
}

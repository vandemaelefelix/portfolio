import { useState } from 'react';
import useIsMobile from '../hooks/useIsMobile';
import styles from '../styles/components/Contact.module.css';
import MovingBanner from './MovingBanner';

export default function Contact() {
    const isMobile = useIsMobile();

    const [isNumberCopied, setIsNumberCopied] = useState(false);
    const [numberTimeout, setNumberTimeout] = useState<any>();
    const [isEmailCopied, setIsEmailCopied] = useState(false);
    const [emailTimeout, setEmailTimeout] = useState<any>();

    // let numberTimeout: any;

    const copyEmail = () => {
        if (!isEmailCopied) {
            navigator.clipboard.writeText('vandemaelefelix@gmail.com');
            setIsEmailCopied(true);
            clearTimeout(emailTimeout);
            setEmailTimeout(
                setInterval(() => {
                    setIsEmailCopied(false);
                }, 5000)
            );
        }
    };

    const copyPhone = () => {
        if (!isNumberCopied) {
            navigator.clipboard.writeText('0472 75 90 85');
            setIsNumberCopied(true);
            clearTimeout(numberTimeout);
            setNumberTimeout(
                setInterval(() => {
                    setIsNumberCopied(false);
                }, 5000)
            );
        }
    };

    return (
        <section id={'contactSection'} className={`${styles.contactSection}`}>
            <MovingBanner title={'contact me'}></MovingBanner>
            <div className={`${styles.content}`}>
                <div className={`${styles.titleContainer}`}>
                    <h1 className={`${styles.title}`}>Interested?</h1>
                    <h2 className={`${styles.subTitle}`}>Let&apos;s get in touch!</h2>
                </div>
                <div className={`${styles.infoContainer}`}>
                    <div
                        onClick={copyEmail}
                        className={`${styles.emailContainer} ${isEmailCopied ? styles.copied : ''}`}
                    >
                        <p className={`${styles.email}`}>
                            vandemaelefelix@gmail.com
                            <span>
                                <svg viewBox="0 0 290 330">
                                    <g transform="translate(-20)">
                                        <path d="M35,270H80v45a15,15,0,0,0,15,15H295a15,15,0,0,0,15-15V75a15,15,0,0,0-15-15H250V15A15,15,0,0,0,235,0H35A15,15,0,0,0,20,15V255A15,15,0,0,0,35,270Zm245,30H110V90H280ZM50,30H220V60H95A15,15,0,0,0,80,75V240H50Z" />
                                        <path d="M155,120a15,15,0,0,0,0,30h80a15,15,0,0,0,0-30Z" />
                                        <path d="M235,180H155a15,15,0,0,0,0,30h80a15,15,0,0,0,0-30Z" />
                                        <path d="M235,240H155a15,15,0,0,0,0,30h80a15,15,0,0,0,0-30Z" />
                                    </g>
                                </svg>
                            </span>
                        </p>
                        <p className={`${styles.copiedEmailText}`}>
                            copied!
                            <span>ok</span>
                        </p>
                    </div>
                    <div
                        onClick={copyPhone}
                        className={`${styles.phoneContainer} ${isNumberCopied ? styles.copied : ''}`}
                    >
                        {!isMobile ? (
                            <p className={`${styles.phone}`}>
                                0472 75 90 85
                                <span>
                                    <svg viewBox="0 0 290 330">
                                        <g transform="translate(-20)">
                                            <path d="M35,270H80v45a15,15,0,0,0,15,15H295a15,15,0,0,0,15-15V75a15,15,0,0,0-15-15H250V15A15,15,0,0,0,235,0H35A15,15,0,0,0,20,15V255A15,15,0,0,0,35,270Zm245,30H110V90H280ZM50,30H220V60H95A15,15,0,0,0,80,75V240H50Z" />
                                            <path d="M155,120a15,15,0,0,0,0,30h80a15,15,0,0,0,0-30Z" />
                                            <path d="M235,180H155a15,15,0,0,0,0,30h80a15,15,0,0,0,0-30Z" />
                                            <path d="M235,240H155a15,15,0,0,0,0,30h80a15,15,0,0,0,0-30Z" />
                                        </g>
                                    </svg>
                                </span>
                            </p>
                        ) : (
                            <a className={`${styles.phone}`} href="tel:+32 472 75 90 85">
                                0472 75 90 85
                            </a>
                        )}
                        <p className={`${styles.copiedPhoneText}`}>
                            copied!
                            <span>ok</span>
                        </p>
                    </div>
                </div>
                <div data-mouse={'hide'} className={`${styles.socials}`}>
                    <div data-mouse={'hide'} className={`${styles.socialsItem}`}>
                        <svg viewBox="0 0 50 50.598">
                            <path d="M25,0C11.194,0,0,11.613,0,25.937A25.87,25.87,0,0,0,17.1,50.547c1.25.238,1.706-.564,1.706-1.248l-.036-4.829c-6.952,1.567-8.421-3.058-8.421-3.058-1.138-3-2.776-3.793-2.776-3.793-2.272-1.608.178-1.577.178-1.577a5.272,5.272,0,0,1,3.831,2.672c2.231,3.964,5.853,2.818,7.276,2.153A5.63,5.63,0,0,1,20.443,37.4c-5.549-.655-11.387-2.881-11.387-12.82a10.252,10.252,0,0,1,2.571-6.961,9.667,9.667,0,0,1,.247-6.867s2.1-.7,6.875,2.66a22.829,22.829,0,0,1,12.509,0c4.77-3.359,6.869-2.66,6.869-2.66a9.63,9.63,0,0,1,.25,6.864,10.222,10.222,0,0,1,2.57,6.961c0,9.964-5.847,12.158-11.416,12.8a6.3,6.3,0,0,1,1.7,4.8L31.194,49.3c0,.69.455,1.5,1.721,1.25A25.891,25.891,0,0,0,50,25.937C50,11.613,38.806,0,25,0Z" />
                        </svg>
                        <p className={`${styles.socialsName}`}>GitHub</p>
                    </div>
                    <div data-mouse={'hide'} className={`${styles.socialsItem}`}>
                        <svg viewBox="0 0 50 50">
                            <path
                                d="M49.962,17.01c-.012-.061-.021-.121-.038-.18-.01-.036-.022-.069-.034-.1q-.025-.079-.055-.156c-.015-.036-.032-.07-.048-.1s-.047-.1-.073-.143-.04-.067-.061-.1A2.155,2.155,0,0,0,49.489,16q-.051-.06-.106-.116c-.028-.028-.057-.057-.086-.084s-.08-.07-.122-.1-.064-.051-.1-.074c-.012-.009-.023-.019-.036-.027L26.191.362a2.146,2.146,0,0,0-2.383,0L.957,15.6c-.013.008-.023.018-.036.027-.034.023-.065.048-.1.073s-.082.066-.122.1-.058.055-.086.084S.543,15.958.509,16s-.05.061-.073.094-.062.086-.091.131-.042.065-.061.1-.05.093-.073.141-.034.069-.048.1c-.021.051-.039.1-.056.156-.011.035-.023.069-.033.1-.016.059-.027.119-.038.18-.006.031-.013.061-.018.093A2.16,2.16,0,0,0,0,17.38V32.617a1.946,1.946,0,0,0,.02.281c0,.034.014.061.02.093a1.245,1.245,0,0,0,.04.182c.009.034.02.067.034.1.017.054.034.108.054.157.014.034.034.067.047.1s.047.094.074.143c.019.034.04.067.061.1a1.06,1.06,0,0,0,.094.128c.024.034.047.061.074.093a1.081,1.081,0,0,0,.108.117.527.527,0,0,0,.088.081l.121.1c.032.027.068.047.094.073.013.007.02.02.034.026L23.808,49.639A2.112,2.112,0,0,0,25,50a2.16,2.16,0,0,0,1.192-.361L49.043,34.4c.013-.008.023-.017.036-.026.034-.023.065-.048.1-.073s.083-.067.122-.1.058-.055.086-.084a1.929,1.929,0,0,0,.18-.209c.032-.042.062-.086.091-.131s.042-.065.061-.1.05-.095.073-.143.033-.069.048-.1c.021-.052.038-.1.055-.157.011-.035.023-.069.034-.1.016-.059.026-.12.038-.18.005-.031.014-.061.017-.093A2.126,2.126,0,0,0,50,32.619V17.384a2.273,2.273,0,0,0-.019-.281c-.005-.033-.015-.06-.022-.093h0ZM25,30.083,17.4,25,25,19.918,32.6,25Zm-2.148-13.9-9.315,6.23-7.519-5.03L22.852,6.164V16.186ZM9.672,25,4.3,28.6v-7.19Zm3.864,2.587,9.315,6.23V43.839L6.018,32.615l7.519-5.029h0Zm13.611,6.229,9.315-6.23,7.52,5.029L27.148,43.837V33.816ZM40.327,25l5.375-3.6V28.6L40.327,25h0Zm-3.864-2.586-9.315-6.23V6.164L43.982,17.386l-7.52,5.03Z"
                                transform="translate(0 -0.001)"
                            />
                        </svg>

                        <p className={`${styles.socialsName}`}>Codepen</p>
                    </div>
                    <div data-mouse={'hide'} className={`${styles.socialsItem}`}>
                        <svg viewBox="0 0 50 50">
                            <path d="M46.3,50H3.695a3.73,3.73,0,0,1-2.612-1.048A3.5,3.5,0,0,1,0,46.42V3.582A3.5,3.5,0,0,1,1.083,1.05,3.729,3.729,0,0,1,3.695,0H46.3a3.731,3.731,0,0,1,2.613,1.05A3.5,3.5,0,0,1,50,3.582V46.419a3.5,3.5,0,0,1-1.082,2.532A3.732,3.732,0,0,1,46.3,50ZM30.9,24.712a3.3,3.3,0,0,1,2.91,1.41,6.536,6.536,0,0,1,.88,3.681V41.844h7.481V28.937c0-6.344-3.22-10.132-8.613-10.132a7.473,7.473,0,0,0-6.743,3.714V19.334H19.336c.1,2.089,0,22.3,0,22.506v0h7.482V29.274a4.956,4.956,0,0,1,.247-1.825,4.663,4.663,0,0,1,1.347-1.873A3.844,3.844,0,0,1,30.9,24.712ZM7.712,19.333V41.844H15.2V19.333ZM11.5,8.482c-2.493,0-4.233,1.6-4.233,3.889a3.885,3.885,0,0,0,4.135,3.888h.05a4.466,4.466,0,0,0,3.05-1.086,3.744,3.744,0,0,0,1.182-2.8A3.883,3.883,0,0,0,11.5,8.482Z" />
                        </svg>

                        <p className={`${styles.socialsName}`}>LinkedIn</p>
                    </div>
                </div>
                {/* <div className={`${styles.hireButton}`}>
                    <p>Hire me!</p>
                </div> */}
            </div>
            <div className={styles.bottomBanner}>
                <MovingBanner direction={1} title={'contact me'}></MovingBanner>
            </div>
        </section>
    );
}

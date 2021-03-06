import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../styles/components/Menu.module.css';
import { gsap } from 'gsap';

import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

const Menu = forwardRef(({ parent }: any, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpening, setIsOpening] = useState<boolean>(false);
    const [pages, setPages] = useState([
        { name: 'home', id: 'firstSection' },
        { name: 'about me', id: 'aboutSection' },
        { name: 'my projects', id: 'projectsSection' },
        { name: 'my tools', id: 'spotlightSection' },
        { name: 'contact me', id: 'contactSection' },
    ]);
    // const [pages, setPages] = useState(['home', 'about me', 'my technologies', 'contact me']);

    const openMenu = () => {
        if (!isOpening) {
            setIsOpening(true);
            setIsOpen(true);
            disableScroll();
            setTimeout(() => {
                setIsOpening(false);
            }, 10);
        }
    };

    const closeMenu = () => {
        if (!isOpening) {
            setIsOpening(true);
            setTimeout(() => {
                setIsOpen(false);
                enableScroll();
            }, 10);
            setTimeout(() => {
                setIsOpening(false);
            }, 10);
        }
    };

    const goTo = (page: any) => {
        console.log(page.name);
        console.log(page.id);
        closeMenu();
        setTimeout(() => {
            gsap.to(window, { duration: 1, scrollTo: { y: `#${page.id}` } });
        }, 250);
    };

    useImperativeHandle(ref, () => ({
        openMenu,
    }));

    const disableScroll = () => {
        // To get the scroll position of current webpage
        const TopScroll = window.pageYOffset || document.documentElement.scrollTop;
        const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
        // if scroll happens, set it to the previous value
        window.onscroll = function () {
            window.scrollTo(LeftScroll, TopScroll);
        };
    };

    const enableScroll = () => {
        window.onscroll = function () {};
    };

    return (
        <div data-mouse="inverted" className={`${styles.menu} ${isOpen ? styles.show : ''}`}>
            <div data-mouse="inverted" className={`${styles.menuBackground}`}></div>
            <div
                onClick={() => {
                    closeMenu();
                }}
                className={`${styles.menuIcon} ${isOpen ? styles.active : ''}`}
                data-mouse="hide"
            >
                <p data-mouse="hide" className={styles.menuIconText}>
                    close
                </p>
                <span data-mouse="hide" className={styles.menuIconDot}></span>
            </div>
            <div data-mouse="inverted" className={`${styles.menuContent}`}>
                <ul data-mouse="inverted">
                    {pages.map((page: any) => (
                        <li
                            onClick={() => {
                                goTo(page);
                            }}
                            key={page.id}
                            data-mouse="inverted"
                            className={`${isOpening ? styles.closing : ''}`}
                        >
                            {'  '}
                            <span>
                                <svg viewBox="0 0 37.833 37.833">
                                    <g transform="translate(18.917) rotate(45)">
                                        <path
                                            d="M 23.5485897064209 23.54201698303223 C 20.00277709960938 21.24861335754395 15.77107334136963 19.87440490722656 11.91342449188232 19.87440490722656 C 9.477958679199219 19.87440490722656 7.248828411102295 20.41231918334961 5.322402954101562 21.45034980773926 C 8.340620994567871 16.02938652038574 7.015796661376953 8.970254898071289 3.406765460968018 3.423787117004395 C 6.903822898864746 5.735080718994141 10.8783655166626 7.044854640960693 14.63987445831299 7.044854640960693 C 17.14252853393555 7.044854640960693 19.4507884979248 6.457704067230225 21.45958709716797 5.325591087341309 C 19.9969425201416 8.067934989929199 19.54608535766602 11.42863845825195 20.19097518920898 15.09473514556885 C 20.70497894287109 18.01675415039062 21.8972282409668 20.9738883972168 23.5485897064209 23.54201698303223 Z"
                                            stroke="none"
                                        />
                                        <path
                                            d="M 4.86210823059082 4.883350372314453 C 6.062654495239258 7.107564926147461 6.894138336181641 9.485599517822266 7.269325256347656 11.85051441192627 C 7.761688232421875 14.95403385162354 7.446018218994141 17.86974143981934 6.379562377929688 20.40185546875 C 8.059076309204102 19.72334861755371 9.920160293579102 19.3743953704834 11.91342449188232 19.3743953704834 C 15.26960182189941 19.3743953704834 18.90076446533203 20.38881683349609 22.14180374145508 22.13235473632812 C 20.96625137329102 19.93626403808594 20.1147632598877 17.54755592346191 19.69853591918945 15.18135452270508 C 19.13278579711914 11.96518135070801 19.38763809204102 8.972507476806641 20.40927505493164 6.402530670166016 C 18.65064430236816 7.15662956237793 16.70896911621094 7.544855117797852 14.63986492156982 7.544855117797852 C 11.39168643951416 7.544855117797852 7.99183464050293 6.595064163208008 4.86210823059082 4.883350372314453 M -5.7220458984375e-06 -5.7220458984375e-06 C 6.582685470581055 6.582685470581055 17.40214538574219 9.350004196166992 23.9293155670166 2.822824478149414 C 17.42539596557617 9.326755523681641 20.83655548095703 20.83655548095703 26.75214385986328 26.75214385986328 C 20.83744430541992 20.83744430541992 9.393278121948242 17.3588752746582 2.822824478149414 23.9293155670166 C 9.259794235229492 17.49235534667969 6.550405502319336 6.550405502319336 -5.7220458984375e-06 -5.7220458984375e-06 Z"
                                            stroke="none"
                                        />
                                    </g>
                                </svg>
                            </span>
                            {'  '}
                            <p>{page.name}</p>
                            {/* <Link href={`#${page.id}`} scroll={false}>
                                <a>{page.name}</a>
                            </Link> */}
                            {'  '}
                            <span>
                                <svg viewBox="0 0 37.833 37.833">
                                    <g transform="translate(18.917) rotate(45)">
                                        <path
                                            d="M 23.5485897064209 23.54201698303223 C 20.00277709960938 21.24861335754395 15.77107334136963 19.87440490722656 11.91342449188232 19.87440490722656 C 9.477958679199219 19.87440490722656 7.248828411102295 20.41231918334961 5.322402954101562 21.45034980773926 C 8.340620994567871 16.02938652038574 7.015796661376953 8.970254898071289 3.406765460968018 3.423787117004395 C 6.903822898864746 5.735080718994141 10.8783655166626 7.044854640960693 14.63987445831299 7.044854640960693 C 17.14252853393555 7.044854640960693 19.4507884979248 6.457704067230225 21.45958709716797 5.325591087341309 C 19.9969425201416 8.067934989929199 19.54608535766602 11.42863845825195 20.19097518920898 15.09473514556885 C 20.70497894287109 18.01675415039062 21.8972282409668 20.9738883972168 23.5485897064209 23.54201698303223 Z"
                                            stroke="none"
                                        />
                                        <path
                                            d="M 4.86210823059082 4.883350372314453 C 6.062654495239258 7.107564926147461 6.894138336181641 9.485599517822266 7.269325256347656 11.85051441192627 C 7.761688232421875 14.95403385162354 7.446018218994141 17.86974143981934 6.379562377929688 20.40185546875 C 8.059076309204102 19.72334861755371 9.920160293579102 19.3743953704834 11.91342449188232 19.3743953704834 C 15.26960182189941 19.3743953704834 18.90076446533203 20.38881683349609 22.14180374145508 22.13235473632812 C 20.96625137329102 19.93626403808594 20.1147632598877 17.54755592346191 19.69853591918945 15.18135452270508 C 19.13278579711914 11.96518135070801 19.38763809204102 8.972507476806641 20.40927505493164 6.402530670166016 C 18.65064430236816 7.15662956237793 16.70896911621094 7.544855117797852 14.63986492156982 7.544855117797852 C 11.39168643951416 7.544855117797852 7.99183464050293 6.595064163208008 4.86210823059082 4.883350372314453 M -5.7220458984375e-06 -5.7220458984375e-06 C 6.582685470581055 6.582685470581055 17.40214538574219 9.350004196166992 23.9293155670166 2.822824478149414 C 17.42539596557617 9.326755523681641 20.83655548095703 20.83655548095703 26.75214385986328 26.75214385986328 C 20.83744430541992 20.83744430541992 9.393278121948242 17.3588752746582 2.822824478149414 23.9293155670166 C 9.259794235229492 17.49235534667969 6.550405502319336 6.550405502319336 -5.7220458984375e-06 -5.7220458984375e-06 Z"
                                            stroke="none"
                                        />
                                    </g>
                                </svg>
                            </span>
                            {'  '}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
});

Menu.displayName = 'Menu';

export default Menu;

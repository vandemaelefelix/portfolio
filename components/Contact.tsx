import styles from '../styles/components/Contact.module.css';

export default function Contact() {
    return (
        <section id={'contactSection'} className={`${styles.contactSection}`}>
            <form>
                <div>
                    <label htmlFor=""></label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor=""></label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor=""></label>
                    <textarea></textarea>
                </div>
            </form>
        </section>
    );
}

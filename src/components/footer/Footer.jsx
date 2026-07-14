import style from "./footer.module.css";

function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.footerContent}>
                <div className={style.teamIcons}>
                    <div className={style.teamMember}>
                        <img src="./public/images/MESSI.png" alt="Integrante 1" className={style.teamIcon} />
                        <p className={style.teamDescription}>Capitán del equipo</p>
                    </div>
                    <div className={style.teamMember}>
                        <img src="./public/images/musk.png" alt="Integrante 2" className={style.teamIcon} />
                        <p className={style.teamDescription}>Tech Leader</p>
                    </div>
                    <div className={style.teamMember}>
                        <img src="./public/images/jenseng.png" alt="Integrante 3" className={style.teamIcon} />
                        <p className={style.teamDescription}>CEO cooperativo</p>
                    </div>
                </div>
                <p>&copy; 2026- APEX STORE</p>
            </div>
        </footer>
    );
}
export default Footer;
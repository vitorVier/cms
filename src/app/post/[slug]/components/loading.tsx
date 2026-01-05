import styles from './loading.module.scss'

export function LoadingPost() {
    return (
        <div className={styles.loading}>
            <ul>
                <li>
                    <div className={styles.loader}>
                    <div className={styles.child}></div>
                    </div>
                </li>

                <li>
                    <div className={styles.text}>Loading...</div>
                </li>
            </ul>
        </div>
    )
}
import styles from "../styles/Home.module.css";
import { Message } from "rsuite";

export function Disclaimer(props){
    const messageText = "Disclaimer! This calculator has not been officially verified as accurate against Coventry University's internal systems. However, it does follow the algorithms correctly (to the best of our knowledge).";
    
    if (props.asMessage) {
        return (
            <Message showIcon type="warning" description={messageText} />
        );
    }
    
    return (
        <footer className={styles.footer}>
        <p>{messageText}</p>
        <p>by Armandas Barkauskas</p>
      </footer>
    );
    
}
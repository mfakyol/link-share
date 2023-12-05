import LoadingIcon from '@/icons/LoadingIcon'
import classes from './styles.module.scss'
import { useTranslation } from '@/contexts/TranslationContext'

interface LoadingProps {
    text?: string
}

function Loading({text="loading"}: LoadingProps) {
    const [t] = useTranslation();
  return (
    <div className={classes.loading}>
        <LoadingIcon className={classes.icon}/>
        <p className={classes.text}>{t(text)}</p>
    </div>
  )
}

export default Loading
import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import { UserComponent } from "../components/user-components";

type Props = Omit<ImageProps, "src"> & {
    srcLight: string;
    srcDark: string;
};

const ThemeImage = (props: Props) => {
    const { srcLight, srcDark, ...rest } = props;

    return (
        <>
            <Image {...rest} src={srcLight} className="imgLight" />
            <Image {...rest} src={srcDark} className="imgDark" />
        </>
    );
};


export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <ThemeImage
                    className={styles.logo}
                    srcLight="turborepo-dark.svg"
                    srcDark="turborepo-light.svg"
                    alt="Turborepo logo"
                    width={180}
                    height={38}
                    priority
                />
                <UserComponent />
            </main>
        </div>
    );
}

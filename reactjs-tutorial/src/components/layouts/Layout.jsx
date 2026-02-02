export default function Layout(props) {
    const { children } = props

    const header = (
        <header>
            <h1 className="text-medium text-gradient">
                Unalive
            </h1>
        </header>
    )

    const footer = (
        <footer>
            <small>Created by</small>
            <a target="_blank" href="https://twitter.com/ygsitaa">
            <img alt="pfp" src="https://pbs.twimg.com/profile_images/1903147820699496449/kpvh59VF_400x400.jpg"></img>
                <p>ygsitaa</p>
                <i className="fa-brands fa-twitter"></i>
            </a>
        </footer>
    )

    return (
        <>
            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )
}
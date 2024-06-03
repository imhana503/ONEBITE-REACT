import './Header.css';

const Header = () => {
    return(
        <header className="header">
            <div>
                <span>오늘은</span>
                <h1>{new Date().toDateString()}</h1>
            </div>
        </header>
    )
}

export default Header;
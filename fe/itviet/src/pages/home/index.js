
import{memo} from "react"
import{useState,useEffect } from "react"
import { FaMapMarkerAlt, FaCaretDown, FaSearch } from "react-icons/fa"; // Import icon từ react-icons

const Home = () =>{
    
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    
     // Hàm toggle dropdown
     const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    // Hàm đóng dropdown khi nhấn ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".dropdown")) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (
        <>
            {/* Header */}
            <header className="Header">
                <img src="/image.png" height="37" alt="Logo" />
                <nav className="nav-menu">
                    <div className="dropdown">
                        <button className="dropdown-button"><p>All Jobs <FaCaretDown /></p></button>
                        <ul className="dropdown-menu">
                            <li>Jobs by Skill</li>
                            <li>Jobs by Title</li>
                            <li>Jobs by Company</li>
                            <li>Jobs by City</li>
                        </ul>
                    </div>
                    <div className="dropdown">
                        <button className="dropdown-button"><p>IT Companies <FaCaretDown /></p></button>
                        <ul className="dropdown-menu">
                            <li>Vietnam Best IT Companies</li>
                            <li>Company Reviews</li>
                        </ul>
                    </div>
                    <div className="dropdown">
                        <button className="dropdown-button"><p>Blog <FaCaretDown /></p></button>
                        <ul className="dropdown-menu">
                            <li>IT Salary Report</li>
                            <li>IT Career</li>
                            <li>Applying & Career Up</li>
                            <li>IT Expertise</li>
                        </ul>
                    </div>
                </nav>
                <div className="right-section">
                    <div className="underline-hover">For Employers</div>
                    <div className="underline-hover">Sign in/Sign up</div>
                    <div className="underline-hover">EN|VI</div>
                </div>
            </header>

            <div className="background-section"></div>

            <div className="main-container">
    <main className="main">
        <div className="search-container">
            {/* Dropdown */}
            <div className="dropdown">
                <button className="dropdown-button-main" onClick={toggleDropdown}>
                    <p>
                        <FaMapMarkerAlt style={{ marginRight: "8px" }} />
                        <span className="style">All Cities</span>
                        <FaCaretDown className="icon-right" />
                    </p>
                </button>
                {isOpen && (
                    <ul className="dropdown-menu">
                        <li>All Cities</li>
                        <li>Ho Chi Minh</li>
                        <li>Ha Noi</li>
                        <li>Da Nang</li>
                        <li>Others</li>
                    </ul>
                )}
            </div>

            {/* Thanh tìm kiếm */}
            <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Nút tìm kiếm */}
            <button className="search-button">
                <FaSearch className="style"/>
                <span className="style"> Search</span>
            </button>
        </div>
    </main>
</div>

    </>
    );
};

export default memo(Home);
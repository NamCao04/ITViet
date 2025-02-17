import { memo } from "react";
import { useState, useEffect } from "react";
import { FaArrowCircleRight  } from "react-icons/fa";
import { FaMapMarkerAlt, FaCaretDown, FaSearch } from "react-icons/fa"; // Import icon từ react-icons

const jobList = [
    { id: 1, title: "Frontend Developer", location: "Ho Chi Minh", description: "Develop and maintain web applications." },
    { id: 2, title: "Backend Developer", location: "Ha Noi", description: "Work on server-side logic and databases." },
    { id: 3, title: "UI/UX Designer", location: "Da Nang", description: "Create user-friendly designs and interfaces." }
];

const jobData = [
    "Senior Project Manager (Release Train Engineer)",
    "StarCamp (Fresher) Quality Engineers - Hanoi",
    "Quality Engineering Manager",
];

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedJob, setSelectedJob] = useState(jobList[0]);

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
                            placeholder="Enter keyword skill (Java, iOS...), job title, company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        {/* Nút tìm kiếm */}
                        <button className="search-button">
                            <FaSearch className="style" />
                            <span className="style"> Search</span>
                        </button>
                    </div>

                    <div className="header-images">
                        <img src="/anh.png" height="37" alt="Logo" className="img-size1" />
                        <img src="/anh1.png" height="37" alt="Logo" className="img-size2" />
                        <div className="header-conten">
                            <h3 className="header-main">NAB Innovation Centre Vietnam</h3>

                            <div className="header-main-conten">
                            <FaMapMarkerAlt style={{ marginRight: "8px" }}  />
                            <span >Ha Noi - Ho Chi Minh</span>
                            </div>
                            
                            <div className="conten-main">
                            The NAB Innovation Centre Vietnam is owned by NAB - Australia’s largest business bank.
                            </div>

                            <p className="conten-link" onClick={() => alert("Show more jobs!")}>
                                View 17 jobs {'>'}
                            </p>

                        </div>
                        
                        <div className="boder-main"></div>

                        <ul className="job-list1">
                                    {jobData.map((job, index) => (
                                        <div key={index} className="mota">
                                            <FaArrowCircleRight size={18} color="red" />
                                            <div className="pading">{job}</div>
                                        </div>
                                    ))}
                        </ul>

                    </div>

                    <h1 className="h1">
                        1,018 IT jobs in Vietnam
                    </h1>

                    <div className="filter">
                    <div className="dropdown">
                            <button className="dropdown-button-filter" onClick={toggleDropdown}>
                                <p>
                                    <span className="">Level</span>
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

                        <div className="dropdown">
                            <button className="dropdown-button-filter" onClick={toggleDropdown}>
                                <p>
                                    <span className="">Working Model</span>
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
                        <div className="dropdown">
                            <button className="dropdown-button-filter" onClick={toggleDropdown}>
                                <p>
                                    <span className="">Salary</span>
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
                        <div className="dropdown">
                            <button className="dropdown-button-filter" onClick={toggleDropdown}>
                                <p>
                                    <span className="">Industry</span>
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
                    </div>

                    

                    {/* Phần hiển thị danh sách và chi tiết công việc */}
                    <div className="job-details-container">
                        <div className="job-list">
                            <ul>
                                {jobList.map((job) => (
                                    <li key={job.id} onClick={() => setSelectedJob(job)} className="job-item">
                                        {job.title} - {job.location}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="job-detail">
                            <h2>{selectedJob.title}</h2>
                            <p><strong>Location:</strong> {selectedJob.location}</p>
                            <p><strong>Description:</strong> {selectedJob.description}</p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default memo(Home);
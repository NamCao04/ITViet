import { memo } from "react";
import { useState, useRef, useEffect } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaMapMarkerAlt, FaCaretDown, FaSearch } from "react-icons/fa"; // Import icon từ react-icons
import React from "react";
import { FaDollarSign } from "react-icons/fa";
import { FaLaptopHouse } from 'react-icons/fa';


const jobList = [
    { id: 1, time: "Posted 15 minutes ago",image:"/anh.png", conten: "", title: "Senior IT Comtor (Japanese) - Up to 40M", name: "NTT DATA VDS", location: "Ho Chi Minh", work: "At office", skill: "Japanese English", state: "HOT" },
    { id: 2, time: "Posted 16 minutes ago",image:"/anh.png", conten: "", title: "Mid/Sr Full-Stack Developer-Australian FinTech (Remote)", name: "Automation Consulting Pty Ltd", location: "Others", work: "Remote", skill: "Nodejs Reactjs TypeScript", state: "HOT" },
    { id: 3, time: "Posted 27 minutes ago",image:"/anh.png", conten: "", title: "Chuyên Viên Kiểm Thử Phần Mềm (Tester, QA QC)", name: "Thuy Anh Technology CO., LTD", location: "Ho Chi Minh", work: "At office", skill: "Tester Automation Test QA QC", state: "HOT" },
];

const jobData = [
    "Senior Project Manager (Release Train Engineer)",
    "StarCamp (Fresher) Quality Engineers - Hanoi",
    "Quality Engineering Manager",
];

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenLevel, setIsOpenLevel] = useState(false);
    const [isOpenWork, setIsOpenWork] = useState(false);
    const [isOpenIndustry, setIsOpenIndustry] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedJob, setSelectedJob] = useState(jobList[0]);

    // Hàm toggle dropdown
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    //level
    const toggleDropdownLevel = () => {
        setIsOpenLevel(!isOpenLevel);
    };

    //working model
    const toggleDropdownWork = () => {
        setIsOpenWork(!isOpenWork);
    };


    //industry
    const toggleDropdownIndustry = () => {
        setIsOpenIndustry(!isOpenIndustry);
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

    //level
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".dropdown-level")) {
                setIsOpenLevel(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    //working model
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".dropdown-work")) {
                setIsOpenWork(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);


    //industry
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".dropdown-industry")) {
                setIsOpenIndustry(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // Hàm kiểm tra vị trí và quyết định hiển thị dropdown ở trên hay dưới
    // Hàm kiểm tra vị trí và quyết định hiển thị dropdown ở trên hay dưới
    useEffect(() => {
        const checkPosition = () => {
            if (dropdownRef.current && buttonRef.current) {
                const buttonRect = buttonRef.current.getBoundingClientRect();
                const dropdownHeight = dropdownRef.current.offsetHeight;
                const spaceBelow = window.innerHeight - buttonRect.bottom;
                const spaceAbove = buttonRect.top;

                // Nếu có đủ không gian bên dưới, hiển thị bên dưới
                if (spaceBelow > dropdownHeight) {
                    dropdownRef.current.style.top = `${buttonRect.bottom}px`;
                    dropdownRef.current.style.bottom = "auto";
                }
                // Nếu không đủ không gian bên dưới, hiển thị bên trên
                else if (spaceAbove > dropdownHeight) {
                    dropdownRef.current.style.top = "auto";
                    dropdownRef.current.style.bottom = `${window.innerHeight - buttonRect.top}px`;
                }
            }
        };

        // Kiểm tra lại khi dropdown mở
        if (isOpenIndustry) {
            checkPosition();
        }

        // Thêm event lắng nghe resize
        window.addEventListener("resize", checkPosition);
        return () => {
            window.removeEventListener("resize", checkPosition);
        };
    }, [isOpenIndustry]);

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
                                <FaMapMarkerAlt style={{ marginRight: "8px" }} />
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
                        <div className="dropdown-level">
                            <button className="dropdown-button-filter" onClick={toggleDropdownLevel}>
                                <p>
                                    <span className="">Level</span>
                                    <FaCaretDown className="icon-right" />
                                </p>
                            </button>
                            {isOpenLevel && (
                                <ul className="dropdown-menu-checkbox">
                                    <li>
                                        <input type="checkbox" id="fresher" />
                                        <label htmlFor="fresher">Fresher</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="junior" />
                                        <label htmlFor="junior">Junior</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="senior" />
                                        <label htmlFor="senior">Senior</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="manager" />
                                        <label htmlFor="manager">Manager</label>
                                    </li>
                                </ul>
                            )}
                        </div>

                        <div className="dropdown-work">
                            <button className="dropdown-button-filter" onClick={toggleDropdownWork}>
                                <p>
                                    <span className="">Working Model</span>
                                    <FaCaretDown className="icon-right" />
                                </p>
                            </button>
                            {isOpenWork && (
                                <ul className="dropdown-menu-checkbox">
                                    <li>
                                        <input type="checkbox" id="At office" />
                                        <label htmlFor="At office">At office</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Remote" />
                                        <label htmlFor="Remote">Remote</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Hybrid" />
                                        <label htmlFor="Hybrid">Hybrid</label>
                                    </li>
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
                        <div className="dropdown-industry">
                            <button className="dropdown-button-filter" onClick={toggleDropdownIndustry}>
                                <p>
                                    <span className="">Industry</span>
                                    <FaCaretDown className="icon-right" />
                                </p>
                            </button>
                            {isOpenIndustry && (
                                <ul className="dropdown-menu-checkbox-industry">
                                    <li>
                                        <input type="checkbox" id="Consumer Goods" />
                                        <label htmlFor="Consumer Goods">Consumer Goods</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="E-commerce" />
                                        <label htmlFor="E-commerce">E-commerce</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Education and Training" />
                                        <label htmlFor="Education and Training">Education and Training</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Food & Beverage" />
                                        <label htmlFor="Food & Beverage">Food & Beverage
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Game" />
                                        <label htmlFor="Game">Game</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Government" />
                                        <label htmlFor="Government">Government</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="IT Hardware and Computing" />
                                        <label htmlFor="IT Hardware and Computing">IT Hardware and Computing</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Non-Profit and Social Services" />
                                        <label htmlFor="Non-Profit and Social Services">Non-Profit and Social Services</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Manufacturing and Engineering" />
                                        <label htmlFor="Manufacturing and Engineering">Manufacturing and Engineering</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Media, Advertising and Entertainment" />
                                        <label htmlFor="Media, Advertising and Entertainment">Media, Advertising and Entertainment</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Environment" />
                                        <label htmlFor="Environment">Environment</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Pharmaceuticals" />
                                        <label htmlFor="Pharmaceuticals">Pharmaceuticals</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Real Estate, Property and Construction" />
                                        <label htmlFor="Real Estate, Property and Construction">Real Estate, Property and Construction</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Retail and Wholesale" />
                                        <label htmlFor="Retail and Wholesale">Retail and Wholesale</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="IT Services and IT Consulting" />
                                        <label htmlFor="IT Services and IT Consulting">IT Services and IT Consulting</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Telecommunication" />
                                        <label htmlFor="Telecommunication">Telecommunication</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Tourism & Hospitality Services" />
                                        <label htmlFor="Tourism & Hospitality Services">Tourism & Hospitality Services</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Transportation, Logistics and Warehouse" />
                                        <label htmlFor="Transportation, Logistics and Warehouse">Transportation, Logistics and Warehouse</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Cyber Security" />
                                        <label htmlFor="Cyber Security">Cyber Security</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Trading and Commercial" />
                                        <label htmlFor="Trading and Commercial">Trading and Commercial</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Network and Infrastructure" />
                                        <label htmlFor="Network and Infrastructure">Network and Infrastructure</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Software Development Outsourcing" />
                                        <label htmlFor="Software Development Outsourcing">Software Development Outsourcing</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Software Products and Web Services" />
                                        <label htmlFor="Software Products and Web Services">Software Products and Web Services</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Agriculture" />
                                        <label htmlFor="Agriculture">Agriculture</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Sports and Fitness" />
                                        <label htmlFor="Sports and Fitness">Sports and Fitness</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Apparel and Fashion" />
                                        <label htmlFor="Apparel and Fashion">Apparel and Fashion</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Creative and Design" />
                                        <label htmlFor="Creative and Design">Creative and Design</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Staffing and Recruiting" />
                                        <label htmlFor="Staffing and Recruiting">Staffing and Recruiting</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Publishing and Printing" />
                                        <label htmlFor="Publishing and Printing">Publishing and Printing</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Facility Management" />
                                        <label htmlFor="Facility Management">Facility Management</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="AI, Blockchain and Deep Tech Services" />
                                        <label htmlFor="AI, Blockchain and Deep Tech Services">AI, Blockchain and Deep Tech Services</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Research Services" />
                                        <label htmlFor="Research Services">Research Services</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Financial Services" />
                                        <label htmlFor="Financial Services">Financial Services</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Healthcare" />
                                        <label htmlFor="Healthcare">Healthcare</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Materials and Mining" />
                                        <label htmlFor="Materials and Mining">Materials and Mining</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Utilities" />
                                        <label htmlFor="Utilities">Utilities</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Professional Services" />
                                        <label htmlFor="Professional Services">Professional Services</label>
                                    </li>
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
                                        <div className="alike">
                                            <p className="time">{job.time}</p>
                                            <p className="title"><h3>{job.title}</h3></p>
                                            <p className="name"><img src={job.image} alt="Description of image" className="img" />{job.name}</p>
                                            <p className="view-salary"><FaDollarSign />Sign in to view salary</p>
                                            <p className="boder-w"></p>
                                            <p className="word-model"><FaLaptopHouse style={{ marginRight: "8px" }} />{job.work}</p>
                                            <p className="location"><FaMapMarkerAlt style={{ marginRight: "8px" }} />{job.location}</p>
                                            <p>{job.skill}</p>
                                            <div className="job-state">{job.state}</div>  {/* Hiển thị state ở góc trên bên phải */}
                                        </div>
                                       
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
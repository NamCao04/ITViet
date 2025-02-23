import { memo } from "react";
import { useState, useRef, useEffect } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaMapMarkerAlt, FaCaretDown, FaSearch } from "react-icons/fa"; // Import icon từ react-icons
import React from "react";
import { FaDollarSign } from "react-icons/fa";
import { FaLaptopHouse } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import icon
import { FaPhone, FaEnvelope, FaTelegramPlane } from "react-icons/fa"; // FaTelegramPlane giống icon gửi tin nhắn trong Zalo
import { FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";

const jobData = [
    "Senior Project Manager (Release Train Engineer)",
    "StarCamp (Fresher) Quality Engineers - Hanoi",
    "Quality Engineering Manager",
];



const Home = () => {
    const [jobList, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenLevel, setIsOpenLevel] = useState(false);
    const [isOpenWork, setIsOpenWork] = useState(false);
    const [isOpenIndustry, setIsOpenIndustry] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedJob, setSelectedJob] = useState(null);


    const [minSalary, setMinSalary] = useState(500);
    const [maxSalary, setMaxSalary] = useState(10000);
    const [isOpen3, setIsOpen3] = useState(false);

    const toggleDropdown1 = () => {
        setIsOpen3(!isOpen3);
    };

    useEffect(() => {
        fetch("https://67241832493fac3cf24d1d33.mockapi.io/0306221306/VanNamCao/itviet")
            .then((response) => response.json())
            .then((jobList) => {
                setData(jobList);
                const defaultJob = jobList.find(job => job.id === "1"); // Tìm công việc có id = 1
                setSelectedJob(defaultJob || jobList[0]); // Nếu không có id = 1, lấy công việc đầu tiên
            })
            .catch((error) => console.error("Lỗi API:", error));
    }, []);


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

    const SkillButtons = ({ skills }) => {
        return (
            <div style={{ display: "flex", gap: "10px" }}>
                {skills?.split(" ").map((skill, index) => (
                    <button
                        key={index}
                        style={{
                            backgroundColor: "white",
                            color: "black",
                            padding: "8px 12px",
                            border: "1px solid black",
                            borderRadius: "20px",
                            cursor: "pointer",
                        }}
                    >
                        {skill}
                    </button>
                ))}
            </div>
        );
    };

    // Sử dụng component với dữ liệu từ jobList
    const JobComponent = ({ job }) => {
        return (
            <SkillButtons skills={job?.skill} />
        );
    };

    const totalPages = 20; // Tổng số trang
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại

    // Xử lý khi nhấn vào số trang
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Hàm tạo danh sách số trang cần hiển thị
    const getPageNumbers = () => {
        let pages = [];
        if (totalPages <= 7) {
            // Nếu tổng trang ít thì hiển thị hết
            pages = [...Array(totalPages).keys()].map((n) => n + 1);
        } else {
            // Nếu trang hiện tại gần đầu
            if (currentPage <= 4) {
                pages = [1, 2, 3, 4, "...", totalPages];
            }
            // Nếu trang hiện tại gần cuối
            else if (currentPage >= totalPages - 3) {
                pages = [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            }
            // Nếu trang hiện tại ở giữa
            else {
                pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
            }
        }
        return pages;
    };

    return (
        <>
            {/* Header */}
            <header className="Header">
                <img src="https://itviec.com/assets/logo-itviec-4492a2f2577a15a0a1d55444c21c0fa55810822b3b189fc689b450fb62ce0b5b.png" height="37" alt="Logo" />
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
                <div className="feedback-button" >
                    <FaCommentAlt style={{ color: "red", marginRight: "8px" }} />
                    Feedback
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
                        <img src="https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBeWtVVEE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--1a31ceb56a18eaff830ef23798c9e1f3fe2e0613/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oSnlaWE5wZW1WZmRHOWZabWwwV3dkcEFsZ0NNQT09IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--c7ff83b896d4db7bd4f14a67b569154fd1b65a60/LinkedIn%20Business%20Banner%20June%202024%20Update%20(600x400px)%20.png" height="37" alt="Logo" className="img-size1" />
                        <img src="https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMmZvSXc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--88c82102b4c6782414b90e4077f75449b9789560/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oSnlaWE5wZW1WZmRHOWZabWwwV3dkcEFhb3ciLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--bb0ebae071595ab1791dc0ad640ef70a76504047/Logo%20MB%20he%20mau%20RGB%2001.png" height="37" alt="Logo" className="img-size2" />
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
                            <button className="dropdown-button-filter" onClick={toggleDropdown1}>
                                <p>
                                    <span className="">Salary</span>
                                    <FaCaretDown className="icon-right" />
                                </p>
                            </button>
                            {isOpen3 && (
                                <div className="dropdown-menu">
                                    <div className="range-labels">
                                        <span>${minSalary} - ${maxSalary}</span>
                                    </div>
                                    <div className="range-slider-container">
                                        {/* Thanh slider ẩn nhưng chứa hai giá trị */}
                                        <input
                                            type="range"
                                            min="500"
                                            max="10000"
                                            value={minSalary}
                                            onChange={(e) => setMinSalary(Math.min(Number(e.target.value), maxSalary - 500))}
                                            className="range-slider"
                                        />
                                        <input
                                            type="range"
                                            min="500"
                                            max="10000"
                                            value={maxSalary}
                                            onChange={(e) => setMaxSalary(Math.max(Number(e.target.value), minSalary + 500))}
                                            className="range-slider"
                                        />
                                        {/* Dải màu giữa hai đầu */}
                                        <div
                                            className="range-track"
                                            style={{
                                                left: `${((minSalary - 500) / 9500) * 100}%`,
                                                width: `${((maxSalary - minSalary) / 9500) * 100}%`,
                                            }}
                                        />
                                    </div>
                                    {/* Nút Apply */}
                                    <button className="apply-button" >Apply</button>

                                </div>
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

                                    {/* Ô tìm kiếm */}
                                    <input
                                        type="text"
                                        placeholder="Search industries..."
                                        className="search-input1"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />

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
                                            <p className="time">Posted {job.time}</p>
                                            <p className="title"><h3>{job.title}</h3></p>
                                            <p className="name"><img src={job.image} alt="Description of image" className="img" />{job.name}</p>
                                            <p className="view-salary"><FaDollarSign />Sign in to view salary</p>
                                            <p className="boder-w"></p>
                                            <p className="word-model"><FaLaptopHouse style={{ marginRight: "8px" }} />{job.work}</p>
                                            <p className="location"><FaMapMarkerAlt style={{ marginRight: "8px" }} />{job.location?.split(", ").pop() || "N/A"}</p>
                                            <JobComponent key={job.id} job={job} />
                                            <div className="job-state">{job.state}</div>  {/* Hiển thị state ở góc trên bên phải */}
                                        </div>

                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="job-detail">
                            <div className="img-detail">
                                <img src={selectedJob?.image} alt="Description of image" className="img1" />
                                <div className="content-detail">
                                    <h2 className="h2-detail"> {selectedJob?.title}</h2>
                                    <p className="name-detail">{selectedJob?.name}</p>
                                    <p className="view-detail"><FaDollarSign />Sign in to view salary</p>
                                </div>

                            </div>
                            <div className="detail-button-icon">
                                <button className="button-detail"><h3>Apply now</h3></button>
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    style={{
                                        color: "red",
                                        fontSize: "30px",
                                        padding: "10px",
                                        backgroundColor: "white",
                                    }}
                                />
                            </div>

                            <p className="border-detail"></p>
                            <div className="detail">
                                <div className="location-work-detail">
                                    <p><FaMapMarkerAlt style={{ marginRight: "8px" }} />{selectedJob?.location}</p>
                                    <p><FaLaptopHouse style={{ marginRight: "5px" }} /> {selectedJob?.work}</p>
                                    <p><FontAwesomeIcon icon={faClock} style={{ fontSize: "18px", color: "gray", marginRight: "5px" }} />{selectedJob?.time}</p>
                                    <p className="skill-detail"><div className="pd">Skills:</div><JobComponent key={selectedJob?.id} job={selectedJob} /></p>

                                    <p className="border-detail1"></p>
                                </div>

                                <div className="conten-detail">
                                    <h2 >Job description</h2>
                                    {selectedJob?.conten1.map((item, index) => (
                                        item.includes("\n") ? (
                                            <p key={index}>
                                                <strong>{item.split("\n")[1]}</strong> {/* In đậm phần ngay sau \n đầu tiên */}
                                                {item.split("\n").slice(2).map((part, i) => (
                                                    <span key={i}> {part}</span> // Giữ nguyên các phần còn lại
                                                ))}
                                            </p>
                                        ) : (
                                            <p key={index}>{item}</p>
                                        )
                                    ))}
                                    <p className="border-detail1"></p>
                                </div>

                                <div className="conten-detail">
                                    <h2 >Your skills and experience</h2>
                                    {selectedJob?.conten2.map((item, index) => (
                                        item.includes("\n") ? (
                                            <p key={index}>
                                                <strong>{item.split("\n")[1]}</strong> {/* In đậm phần ngay sau \n đầu tiên */}
                                                {item.split("\n").slice(2).map((part, i) => (
                                                    <span key={i}> {part}</span> // Giữ nguyên các phần còn lại
                                                ))}
                                            </p>
                                        ) : (
                                            <p key={index}>{item}</p>
                                        )
                                    ))}
                                    <p className="border-detail1"></p>
                                </div>

                                <div className="conten-detail">
                                    <h2 >Why you'll love working here</h2>
                                    {selectedJob?.conten3.map((item, index) => (
                                        item.includes("\n") ? (
                                            <p key={index}>
                                                <strong>{item.split("\n")[1]}</strong> {/* In đậm phần ngay sau \n đầu tiên */}
                                                {item.split("\n").slice(2).map((part, i) => (
                                                    <span key={i}> {part}</span> // Giữ nguyên các phần còn lại
                                                ))}
                                            </p>
                                        ) : (
                                            <p key={index}>{item}</p>
                                        )
                                    ))}
                                    <p className="border-detail"></p>
                                </div>

                                <div className="detail-ft">
                                    <h2>{selectedJob?.name}</h2>
                                    <p>{selectedJob?.name}</p>
                                    <div className="footer-detail">
                                        <div className="d-t-1">
                                            Company type
                                            <p>{selectedJob?.type}</p>
                                        </div>

                                        <div className="d-t-2">
                                            Company industry
                                            <p>
                                                {selectedJob?.industry}
                                            </p>
                                        </div>

                                        <div className="d-t-3">
                                            Company size
                                            <p>
                                                {selectedJob?.size}
                                            </p>
                                        </div>
                                    </div>



                                    <div className="footer-detail1">
                                        <div className="d-d-1">Country
                                            <p><img src={selectedJob?.flag} alt={`flag`} width="30" height="20" /> {selectedJob?.Country}</p>
                                        </div>

                                        <div className="d-d-2">
                                            Working days
                                            <p>
                                                {selectedJob?.days}
                                            </p>
                                        </div>

                                        <div className="d-d-3">
                                            Overtime policy
                                            <p>
                                                {selectedJob?.Overtime}
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <footer className="footer-main">
                <div className="pagination">
                    {/* Nút Previous */}
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="page-button"
                    >
                        <FaChevronLeft />
                    </button>

                    {/* Số trang */}
                    <button
                        onClick={() => goToPage(1)}
                        className={`page-button ${currentPage === 1 ? "active" : ""}`}
                    >
                        1
                    </button>

                    <button
                        onClick={() => goToPage(2)}
                        className={`page-button ${currentPage === 2 ? "active" : ""}`}
                    >
                        2
                    </button>

                    <span className="dots">...</span>

                    <button
                        onClick={() => goToPage(totalPages)}
                        className={`page-button ${currentPage === totalPages ? "active" : ""}`}
                    >
                        {totalPages}
                    </button>

                    {/* Nút Next */}
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="page-button"
                    >
                        <FaChevronRight />
                    </button>
                </div>

                <p className="border-detail"></p>

                <div className="ft-h">Home
                    ›
                    All IT jobs
                </div>

                <div className="ft-backround">

                    <div className="content-ft">
                        <img src="/image.png" height="50" alt="Logo" />
                        <p>Ít nhưng mà chất</p>
                        <p className="social-icons"><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="icon linkedin" />
                        </a>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="icon facebook" />
                            </a>
                            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                                <FaYoutube className="icon youtube" />
                            </a></p>
                    </div>

                    <div className="ft-full">

                        <div>
                            <strong> About Us </strong>
                            <p>Home</p>
                            <p>About Us</p>
                            <p>AI Match Service</p>
                            <p>Contact Us</p>
                            <p>All Jobs</p>
                            <p>FAQ</p>
                        </div>

                        <div>
                            <strong>Campaign</strong>
                            <p>IT Story</p>
                            <p>Writingn Contest</p>
                            <p>Featured IT Jobs</p>
                            <p>Annual Survey</p>
                        </div>

                        <div>
                            <strong> Terms & Conditions </strong>
                            <p>Privacy Policy</p>
                            <p>Operating Regulation</p>
                            <p>Complaint Handling</p>
                            <p>Terms & Conditions</p>
                            <p>Press</p>
                        </div>

                        <div>
                            <strong> Want to post a job? Contact us at:</strong>
                            <p><FaPhone style={{ marginRight: "5px" }} /> Ho Chi Minh: (+84) 977 460 519</p>
                            <p><FaPhone style={{ marginRight: "5px" }} />Ha Noi: (+84) 983 131 351</p>
                            <p><FaEnvelope style={{ marginRight: "5px" }} />Email: love@itviec.com</p>
                            <p><FaTelegramPlane style={{ marginRight: "5px" }} />Submit contact information</p>

                        </div>

                    </div>

                </div>
            </footer>
        </>
    );
};

export default memo(Home);
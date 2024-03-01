import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './homePage.css';

const PAGE_SIZE = 10; // Number of items per page

const HomePage: React.FC = () => {
    const [data, setData] = useState<any[]>([]); // Define state to store fetched data
    const [currentPage, setCurrentPage] = useState(1); // State to store the current page number
    const [totalPages, setTotalPages] = useState(0); // State to store the total number of pages

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, [currentPage]); // Fetch data whenever currentPage changes

    const fetchData = async () => {
        try {
            // Make a GET request to your API endpoint with pagination parameters
            const response = await axios.get(`http://127.0.0.1:8001/customers/?page=${currentPage}`);
            setData(response.data.results); // Set fetched data to state
            setTotalPages(response.data.total); // Set the total number of pages
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="home-page">
            <h2>Home Page</h2>
            {/* Display fetched data */}
            <ul className="user-list">
                {data.map((user: any, index: number) => ( // Add type annotations for user and index
                    <li key={index}>
                        <p>ID: {user.customer_id}</p>
                        <p>First Name: {user.first_name}</p>
                        <p>Last Name: {user.last_name}</p>
                        <p>Date OF Birth: {user.date_of_birth}</p>
                        <p>Phone Number: {user.phone_number}</p>
                    </li>
                ))}
            </ul>
            {/* Pagination controls */}
            <div className="pagination-controls">
                <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default HomePage;

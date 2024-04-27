import React, { useState, useEffect } from "react";

const PaginatedComponent = () => {
  const itemsPerPage = 5; // Số lượng mục trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  // Mô phỏng dữ liệu
  const fetchData = () => {
    // Bạn có thể thay thế dòng này bằng việc gọi API thực tế để lấy dữ liệu
    const mockData = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      name: `Item ${index + 1}`,
    }));
    setData(mockData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Tính toán dữ liệu cần hiển thị trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Hiển thị danh sách dữ liệu trên trang hiện tại */}
      {currentItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}

      {/* Hiển thị nút phân trang */}
      <div>
        {data.length > itemsPerPage && (
          <ul className="pagination">
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
              (_, index) => (
                <li key={index} className={currentPage === index + 1 ? "active" : ""}>
                  <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PaginatedComponent;

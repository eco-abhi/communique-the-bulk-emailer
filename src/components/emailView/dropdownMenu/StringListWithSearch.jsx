import React, { useState, useEffect, useRef } from "react";
import "./StringListWithSearch.css";

const StringListWithSearch = ({
  colSet,
  positionTop,
  positionLeft,
  onItemClick,
}) => {
  const [searchString, setSearchString] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const listContainerRef = useRef(null);

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };

  const handleItemClick = (category, item) => {
    setSelectedItem(item);
    if (onItemClick) {
      onItemClick(category, item);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        listContainerRef.current &&
        !listContainerRef.current.contains(event.target)
      ) {
        // Clicked outside the list container, hide the component.
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const containerStyle = {
    position: "absolute", // or 'fixed' if you prefer
    top: positionTop, // adjust as needed
    left: positionLeft, // adjust as needed
    background: "#001d3d",
    color: "white",
    width: "200px",
    maxHeight: "30vh",
    overflowY: "scroll",
    zIndex: 999,
    borderRadius: "5%",
    border: "2px solid #90e0ef",
    overflowX: "hidden",
  };

  const filterAndGroupItems = () => {
    const groupedItems = {};

    // Filter and group items by category
    Object.keys(colSet).forEach((category) => {
      const categoryItems = colSet[category].filter((item) =>
        item.toLowerCase().includes(searchString.toLowerCase())
      );

      if (categoryItems.length > 0) {
        groupedItems[category] = categoryItems;
      }
    });

    return groupedItems;
  };

  const groupedItems = filterAndGroupItems();

  return isVisible ? (
    <div style={containerStyle} ref={listContainerRef}>
      <input
        className="search-box"
        type="text"
        placeholder="Search..."
        value={searchString}
        onChange={handleSearchChange}
        style={{
          background: "black",
          color: "#e5e5e5",
          width: "100%",
          height: "3vh",
          marginBottom: "5%",
          marginTop: "1%",
          marginLeft: "1%",
        }}
      />
      {Object.keys(groupedItems).map((category) => (
        <div key={category}>
          {groupedItems[category].length > 0 && ( // Check if the category has items
            <div
              style={{
                background: "#444",
                padding: "5px",
                color: "#e5e5e5",
                fontWeight: "bold",
                position: "sticky",
                top: "0", // Stick to the top
                zIndex: "1", // Ensure it's on top of the scrollable content
              }}
            >
              {category}
            </div>
          )}
          <ul>
            {groupedItems[category].map((item, index) => (
              <li
                className="grouped-items"
                key={index}
                onClick={() => handleItemClick(category, item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  ) : null;
};

export default StringListWithSearch;

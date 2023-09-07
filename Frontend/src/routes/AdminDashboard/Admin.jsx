import React, { useState , useEffect} from "react";
import "./Admin.css";
import "../../components/Property/AdminCard";
import Sidebar from "../../components/Sidebar/Sidebar";
import AdminCard from "../../components/Property/AdminCard";

function Admin() {

    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetch("/properties")
            .then((response) => response.json())
            .then((data) => {
                setProperties(data); 
            })
            .catch((error) => {
                console.error("Error fetching properties:", error);
            });
    }, []);

  return (
      <Sidebar>
          <div className='gridProperty' >
              {properties.map((property, index) => (
                  <AdminCard key={index} property={property} />
              ))}
      </div>
    </Sidebar>
  );
}

export default Admin;

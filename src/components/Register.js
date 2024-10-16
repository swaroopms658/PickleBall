import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Register.css";
import Footer from "./Footer";
const Register = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // API Configuration
  const config = {
    cUrl: "https://api.countrystatecity.in/v1/countries",
    ckey: "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
  };

  // Fetch Countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(config.cUrl, {
          headers: { "X-CSCAPI-KEY": config.ckey },
        });
        const countryList = response.data.map((country) => ({
          name: country.name,
          iso2: country.iso2,
        }));
        setCountries(countryList.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch States based on Selected Country
  useEffect(() => {
    const fetchStates = async () => {
      if (selectedCountry) {
        try {
          const response = await axios.get(
            `${config.cUrl}/${selectedCountry}/states`,
            {
              headers: { "X-CSCAPI-KEY": config.ckey },
            }
          );
          setStates(response.data);
          setSelectedState(""); // Reset state on country change
          setCities([]); // Clear cities when country changes
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      }
    };
    fetchStates();
  }, [selectedCountry]);

  // Fetch Cities based on Selected State
  useEffect(() => {
    const fetchCities = async () => {
      if (selectedState) {
        try {
          const response = await axios.get(
            `${config.cUrl}/${selectedCountry}/states/${selectedState}/cities`,
            {
              headers: { "X-CSCAPI-KEY": config.ckey },
            }
          );
          setCities(response.data);
          setSelectedCity(""); // Reset city on state change
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      }
    };
    fetchCities();
  }, [selectedState]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Country:", selectedCountry);
    console.log("State:", selectedState);
    console.log("City:", selectedCity);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Register for Pickleball</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Country Dropdown */}
        <div className="form-group">
          <label>Country:</label>
          <select
            className="form-control"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            required
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.iso2} value={country.iso2}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* State Dropdown */}
        {states.length > 0 && (
          <div className="form-group">
            <label>State:</label>
            <select
              className="form-control"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.iso2} value={state.iso2}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* City Dropdown */}
        {cities.length > 0 && (
          <div className="form-group">
            <label>City:</label>
            <select
              className="form-control"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.iso2} value={city.iso2}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-3">
          Register
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default Register;

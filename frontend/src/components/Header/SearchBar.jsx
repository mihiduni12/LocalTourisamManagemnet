import axios from "axios";
import { useState } from "react";

const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  axios.defaults.baseURL = `http://localhost:5555`;

  const fetchData = (value) => {
    axios.get(`api/productsSearch?name=${value}`)
      .then((response) => {
        setResults(response.data.data); // Assuming the server sends back an object with a 'data' property
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="">
      <div
        class="mr-[45px] mt-0 pl-[297px] float-right overflow-hidden flex w-[500px]"
        style={{ background: "#edf2f7;" }}
      >
        <div class="relative mx-auto font-bold">
          <input
            class="border-2 border-[#a07628] bg-[#f9f9e9] h-11 w-[200px] pl-5 pr-16 rounded-[14px] text-[13pt] focus:outline-none"

            value={input}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search"
          />
          <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
            <svg
              class="text-gray-600 h-4 w-4 fill-current "
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              xmlSpace="preserve"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;

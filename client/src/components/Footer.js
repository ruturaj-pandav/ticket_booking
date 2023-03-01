import { useNavigate } from "react-router-dom";
export default function Footer() {
  let navigate = useNavigate();
  function handlenavigate(page) {
    navigate(`${page}`);
  }
  let content1 = [
    {
      heading: "About us",
      items: ["Board", "Directors", "History", "Reports"],
      sites: ["/board", "/directors", "/history", "/reports"],
    },
    {
      heading: "Information",
      items: ["terms and conditions", "policy"],
      sites: ["/t-c", "/policy"],
    },
    {
      heading: "Careers",
      items: ["work with us", "locations", "internship", "culture"],
      sites: ["/work", "/locations", "/internship", "/culture"],
    },
    {
      heading: "Other",
      items: ["Partner with us", "Global presence"],
      sites: ["/partner", "/global"],
    },
  ];

  return (
    <div className="my-8 container mx-auto">
      <div className="grid grid-cols-4"> 
        {content1.map((content, index1) => {
          return (
            <div>
              <span className="block text-2xl mb-2">{content.heading}</span>
              {content.items.map((item, index2) => {
                return (
                  <span
                    className="block text-gray-500 hover:text-gray-400 cursor-pointer my-3"
                    
                    onClick={() => {
                      handlenavigate(content1[index1].sites[index2]);
                    }}
                  >
                    {item}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

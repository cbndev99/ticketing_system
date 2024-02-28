import TicketCard from "./(components)/TicketCard";

// get tickets
const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      method: "GET",
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    console.log("Fail to get tickets", error);
  }
};

const Dashboard = async () => {
  const { tickets } = await getTickets();

  // get categories
  const uniqueCategories = [
    // Set => take all the results and remove duplicate
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;

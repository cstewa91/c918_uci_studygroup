renderResults = () => {
    const resultType = (this.props.results && this.props.results.length) ? "results" : "all";

    const results = this.props[resultType].map(item => {
        const startDateTime = new Date(item.start_time);
        const endDateTime = new Date(item.end_time);

        const startingTime = startDateTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        const endingTime = endDateTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        const startDate = startDateTime.toLocaleDateString();

        return (
                <div className="search-results-body-row" key={item.id}>
                    <div className="search-results-body-cell">
                        {item.subject}{item.course}
                    </div>
                    <div className="search-results-body-cell">
                        {item.name}
                    </div>
                    <div className="search-results-body-cell">
                        {startDate}
                    </div>
                    <div className="search-results-body-cell">
                        {startingTime} - {endingTime}
                    </div>
                    <div className="search-results-body-cell">
                        {item.current_group_size}/{item.max_group_size}
                    </div>
                    <div className="search-results-body-cell">
                    <GroupModal key={item.id} history={this.props.history} id={item.id} description={item.description}
                text={`${item.subject}${item.course}: ${item.name} ${startDate} ${startingTime} - ${endingTime} ${item.current_group_size}/${item.max_group_size}`}/>
                    </div>
                </div>




                    {/* <div>
                        {item.subject}{item.course}
                    </div>
                    <div>
                        {startDate}
                    </div>
                    <div>
                        {startingTime} - {endingTime}
                    </div>
                    <div>
                        {item.current_group_size}/{item.max_group_size}
                    </div> */}
                {/* </div> */}

                // <GroupModal key={item.id} history={this.props.history} id={item.id} description={item.description}
                // text={`${item.subject}${item.course}: ${item.name} ${startDate} ${startingTime} - ${endingTime} ${item.current_group_size}/${item.max_group_size}`}/>


            

            //text={`${item.subject}${item.course}: ${item.name} ${startDate} ${startingTime} - ${endingTime} ${item.current_group_size}/${item.max_group_size}`}
            //make these each an individual span?
        )
    });

    return results;
}

return (
    <div>
        <label>Search</label>
        <input type="text" onChange={(event) => setQuery(event.target.value)} />
        <button onClick={handleFetch}>Get Data</button>

        {isLoaded ? (
            hits.map((item) => {
                return (
                    <NewsCard
                        url={item.url}
                        title={item.title}
                        author={item.author}
                        key={item.objectID}
                    />
                );
            })
        ) : (
            <div></div>
        )}
                       #New
        {isLoaded ? (
            <ReactPaginate
                pageCount={pageCount}
                pageRange={2}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName={'container'}
                previousLinkClassName={'page'}
                breakClassName={'page'}
                nextLinkClassName={'page'}
                pageClassName={'page'}
                disabledClassNae={'disabled'}
                activeClassName={'active'}
            />
        ) : (
            <div>Nothing to display</div>
        )}

    </div>
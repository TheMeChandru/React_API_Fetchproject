import React, { useEffect , useState } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


const News =(props)=> {
      const [articles, setArticles] = useState([])
      const [loading, setLoading] = useState(true)
      const [page, setPage] = useState(1)
      const [totalResults, settotalResults] = useState(0)
      

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

   const updateNews=  async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    setArticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - DailyNews`;

    updateNews();
  
  }, [])
  

  
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d4cfde45880346fe9bf5d1804db3b157&page=${this.state.page - 1}`;
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })

  const handlePreviousClick = async () => {

    // let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d4cfde45880346fe9bf5d1804db3b157&page=${this.state.page-1}&SpageSize=10`;
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // setState({
    //   page: state.page - 1,
    //   articles:parsedData.articles
    // })
    setPage(page-1)
    updateNews();
  }


  const handleNextClick = async () => {
    //   if(this.state.page +1 > Math.ceil(this.state.totalResults/20)){

    //   }else{
    //   let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d4cfde45880346fe9bf5d1804db3b157&page=${this.state.page +1}&pageSize=10`;
    //   let data = await fetch(url);
    //   let parsedData = await data.json()
    //   this.setState({
    //     page: this.state.page +1, 
    //     articles:parsedData.articles
    //   })
    // }
    setPage(page + 1)
    updateNews();

  }

  const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1 }&pageSize=${props.pageSize}`;
    setPage(page +1)
    let data = await fetch(url);
    let parsedData = await data.json()
   setArticles(articles.concat(parsedData.articles))
   settotalResults(parsedData.totalResults)
    
  };


    return (
      <div className='container my-3'>
        <h2>This is Top Headlines on {capitalizeFirstLetter(props.category)}</h2>
        {/* {state.loading && <Spinner/>} */}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<h4>Loading...</h4>}
        >
            <div className='container'>
          <div className='row'>
            {articles.map((element) => {

              return <div className='col-md-4' key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
              </div>
            })}

          </div>
          </div>
        

          </InfiniteScroll>

          {/* <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
            <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
      </div>
    )
  
}


News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: "genral"
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}


export default News



import React, { useEffect, useRef } from 'react'
import { Button, Item } from '../../components'
import { getPosts, getPostsLimit,getPostsPage  } from '../../store/actions/post'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { ItemRoom } from '../../components'

const List = ({ categoryCode }) => {
    const dispatch = useDispatch()
    const listRef = useRef()
    const [searchParams] = useSearchParams()
    const { posts } = useSelector(state => state.post)

    useEffect(() => {

        dispatch(getPosts())

    }, [])
     
    useEffect(() => {            
        let params = []
        for (let entry of searchParams.entries()) {
            params.push(entry);
        }
        let searchParamsObject = {}
        params?.forEach(i => {
            if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }
        })
        if (categoryCode) searchParamsObject.categoryCode = categoryCode
        dispatch(getPostsLimit(searchParamsObject))
    }, [searchParams, categoryCode])
    return (
        <div>      
             <div ref={listRef} style={styles.room}>
                 {posts?.length > 0 && posts.map(item => {
                     return (
                         <Item
                         key={item?.id}
                         address={item?.address}
                         attributes={item?.attributes}
                         description={item?.description}
                         images={JSON.parse(item?.images?.image)}
                         star={+item?.star}
                         title={item?.title}
                         user={item?.user}
                         id={item?.id}
                         />
                     )
                 })}
             </div>
             
        </div>
     )
 };
 
 const styles = {
     
     room: {
       flex: '40%',
       display: 'flex',
       flexWrap: 'wrap',
       justifyContent: 'space-between',
     },
   };
                 

export default List
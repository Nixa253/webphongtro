import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getPostsLimit } from '../../store/actions/post';
import { Item } from '../../components';

// Composite Component: RoomList
const RoomList = ({ categoryCode }) => {
    const dispatch = useDispatch();
    const listRef = useRef();
    const [searchParams] = useSearchParams();
    const { posts } = useSelector(state => state.post);

    useEffect(() => {
        let params = [];
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
        listRef.current.scrollIntoView({behavior: 'smooth', block: 'start'})
    }, [searchParams, categoryCode])

    return (
        <div>      
            <div ref={listRef} className='grid grid-cols-1 md:grid md:grid-cols-3 md:px-[5rem]' >
                {posts?.length > 0 && posts.filter(item => item?.status === 1).map(item => {
                    return (
                        <RoomItem
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
    );
};

// Leaf Component: RoomItem
const RoomItem = ({ id, address, attributes, description, images, star, title, user }) => {
    return (
        <Item
            key={id}
            address={address}
            attributes={attributes}
            description={description}
            images={images}
            star={star}
            title={title}
            user={user}
            id={id}
        />
    );
};

export default RoomList;
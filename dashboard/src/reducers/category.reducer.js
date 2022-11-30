import { categoryConstants } from "../actions/constants"

const initState = {
    categories: [],
    loading: false,
    error: null
}

const buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];
    if (parentId == undefined) {  //if parent category
        return [
            ...categories, {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ]
    }
    for (let cat of categories) {
        if (cat._id == parentId) {
            /* ex. lets say we create a category in kitchen portion so, if (state.categories._id===parentId) then cat here will be
{ _id: '6349a56cbf58ef7d83f87629', name: 'Kitchen', children: [] }
*/
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, [...cat.children, {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
                }], category) : []
            });
        } else {
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
            });
        }
    }
    return myCategories;
}

export default (state = initState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category;   //payload
            const updatedCategories = buildNewCategories(category.parentId, state.categories, category);
            console.log(updatedCategories)
            state = {
                ...state,
                categories: updatedCategories,
                loading: false,
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...initState
            }
            break;

        case categoryConstants.UPDATE_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.UPDATE_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case categoryConstants.UPDATE_CATEGORY_FAILURE:
            state = {
                ...state,
                error: action.payload.error
            }
            break;
    }

    return state;
}
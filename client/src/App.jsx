import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from "@/Layout/Layout.jsx"
import { RouteAddCategory, RouteBlog, RouteBlogAdd, RouteBlogByCategory, RouteBlogDetails, RouteBlogEdit, RouteCategoryDetails, RouteCommentDetails, RouteEditCategory, RouteIndex, RouteProfile, RouteSearch, RouteSignIn, RouteSignUp, RouteUser } from "@/helper/RouteName.js"
import Index from "@/pages/index.jsx"
import SignUp from '@/pages/SignUp.jsx'
import SignIn from "@/pages/SignIn.jsx"
import Profile from '@/pages/Profile.jsx'
import AddCategory from '@/pages/Category/AddCategory.jsx'
import CategoryDetails from '@/pages/Category/CategoryDetails.jsx'
import EditCategory from '@/pages/Category/EditCategory'
import AddBlog from '@/pages/Blog/AddBlog.jsx'
import BlogDetails from '@/pages/Blog/BlogByCategory.jsx'
import EditBlog from '@/pages/Blog/EditBlog.jsx'
import SingleBlogDetails from '@/pages/SingleBlogDetails.jsx'
import BlogByCategory from "./pages/Blog/BlogByCategory.jsx"
import SearchResult from '@/pages/SearchResult.jsx'
import Comments from '@/pages/Comments.jsx'
import User from "@/pages/User.jsx"
import AuthRouteProtechtion from '@/components/AuthRouteProtechtion.jsx'
import OnlyAdminAllowed from '@/components/OnlyAdminAllowed.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />} >
          <Route index element={<Index />} />


          <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
          <Route path={RouteSearch()} element={<SearchResult />} />


          <Route element={<AuthRouteProtechtion />}>
            <Route path={RouteProfile} element={<Profile />} />
            <Route path={RouteBlogAdd} element={<AddBlog />} />
            <Route path={RouteBlog} element={<BlogDetails />} />
            <Route path={RouteBlogEdit()} element={<EditBlog />} />
            <Route path={RouteCommentDetails} element={<Comments />} />
          </Route>


          <Route element={<OnlyAdminAllowed />}>
            <Route path={RouteAddCategory} element={<AddCategory />} />
            <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
            <Route path={RouteEditCategory()} element={<EditCategory />} />
            <Route path={RouteUser} element={<User />} />
          </Route>

        </Route>

        <Route path={RouteSignIn} element={<SignIn />} />
        <Route path={RouteSignUp} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App 
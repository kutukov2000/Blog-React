import { Route, Routes } from "react-router-dom"
import DefaultLayout from "./components/containers/default/DefaultLayout"
import Login from "./components/account/Login"
import Register from "./components/account/Register"
import CategoryListPage from "./components/categories/CategoriesListPage"
import PostListPage from "./components/posts/PostsListPage"
import PostPage from "./components/posts/PostPage"
import EditCategoryPage from "./components/categories/EditCategoryPage"
import CategoryCreatePage from "./components/categories/CategoryCreatePage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>

          <Route path={"login"} element={<Login />} />
          <Route path={"register"} element={<Register />} />

          <Route index element={<CategoryListPage />} />
          <Route path={"category/:id/:urlSlug"} element={<PostListPage />} />
          <Route path={"category/edit/:id"} element={<EditCategoryPage />} />
          <Route path={"category/create"} element={<CategoryCreatePage />} />

          <Route path={"post/:id/:urlSlug"} element={<PostPage />} />

        </Route>
      </Routes>
    </>
  )
}

export default App

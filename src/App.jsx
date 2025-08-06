import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "@/components/organisms/Layout"
import ModelsPage from "@/components/pages/ModelsPage"
import ModelDetailPage from "@/components/pages/ModelDetailPage"
import ComingSoonPage from "@/components/pages/ComingSoonPage"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ModelsPage />} />
            <Route path="models" element={<ModelsPage />} />
            <Route path="models/:id" element={<ModelDetailPage />} />
            <Route path="clients" element={<ComingSoonPage section="clients" />} />
            <Route path="jobs" element={<ComingSoonPage section="jobs" />} />
            <Route path="bookings" element={<ComingSoonPage section="bookings" />} />
            <Route path="calendar" element={<ComingSoonPage section="calendar" />} />
            <Route path="messages" element={<ComingSoonPage section="messages" />} />
            <Route path="documents" element={<ComingSoonPage section="documents" />} />
            <Route path="analytics" element={<ComingSoonPage section="analytics" />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </BrowserRouter>
  )
}

export default App
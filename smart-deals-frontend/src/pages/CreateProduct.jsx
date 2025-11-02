import React, { useState } from 'react'

const CreateProduct = () => {

    const [condition, setCondition] = useState("brand");

    const handleSubmit = (e) => {
        e.preventDefault(e)
        const form = e.target;
        const title = form.title.value;
        const category = form.category.value;
        const minPrice = form.minPrice.value;
        const maxPrice = form.maxPrice.value;
        const month = form.month.value;
        const conditionValue = condition;
        const imagUrl = form.imagUrl.value;
        const sellerName = form.sellerName.value;
        const sellerEmail = form.sellerEmail.value;
        const sellerContact = form.sellerContact.value;
        const location = form.location.value;
        const textArea = form.textArea.value;
        console.log(title, category,minPrice,maxPrice,month, conditionValue, imagUrl, sellerName, sellerEmail,sellerContact, location,textArea);
        
        const newProduct = {title, category,minPrice,maxPrice,month, conditionValue, imagUrl, sellerName, sellerEmail,sellerContact, location,textArea}


        // save product data to db
        fetch('http://localhost:3000/products', {
            method: "post",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(newProduct)
           
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            
        })
        
        form.reset();
    }

  return (
    <div>
          <div className="min-h-screen flex items-start justify-center bg-gray-50 p-6">
      <div className="w-full max-w-3xl mt-8">
        <button className="text-sm text-gray-600 mb-4 flex items-center">{
          '<'} Back To Products
        </button>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold">
            <span className="text-gray-900">Create </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-violet-400">A Product</span>
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Title</label>
                <input name='title' className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50" placeholder="e.g. Yamaha Fz Guitar for Sale" />
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">Category</label>
                <select name='category' className="w-full border rounded-md px-3 py-2 text-sm bg-white">
                  <option>Select a Category</option>
                  <option>Electronics</option>
                  <option>Furniture</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">Min Price You want to Sale ($)</label>
                <input name='minPrice' className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50" placeholder="e.g. 18.5" />
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">Max Price You want to Sale ($)</label>
                <input name='maxPrice' className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50" placeholder="Optional (default = Min Price)" />
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">Product Condition</label>
                <div className="flex items-center gap-6 mt-1">
                  <label className={`flex items-center gap-2 cursor-pointer ${condition === 'brand' ? '' : ''}`}>
                    <input type="radio" name="condition" checked={condition === 'brand'} onChange={() => setCondition('brand')} className="accent-purple-600" />
                    <span className="text-sm">Brand New</span>
                  </label>

                  <label className={`flex items-center gap-2 cursor-pointer ${condition === 'used' ? '' : ''}`}>
                    <input type="radio" name="condition" checked={condition === 'used'} onChange={() => setCondition('used')} className="accent-gray-500" />
                    <span name="c" className="text-sm">Used</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">Product Usage time</label>
                <input name='month' className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50" placeholder="e.g. 1 year 3 month" />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-600 block mb-1">Your Product Image URL</label>
                <input name='imagUrl' className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50" placeholder="https://..." />
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">Seller Name</label>
                <input name='sellerName' className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50" placeholder="e.g. Artisan Roasters" />
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">Seller Email</label>
                <input name='sellerEmail' className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50" placeholder="name@example.com" />
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">Seller Contact</label>
                <input name='sellerContact' className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50" placeholder="e.g. +1-555-1234" />
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">Seller Image URL</label>
                <input className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50" placeholder="https://..." />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-600 block mb-1">Location</label>
                <input name='location' className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50" placeholder="City, Country" />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-600 block mb-1">Simple Description about your Product</label>
                <textarea name='textArea' rows={4} className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50" placeholder="e.g. I bought this product 3 month ago..." />
              </div>
            </div>

            <div>
              <button type="submit" className="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-purple-600 to-violet-400 shadow-md">Create A Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CreateProduct 
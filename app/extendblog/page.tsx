"use client";

const ExtendBlog = () => {
    return (
        <>
            <div className="relative w-full">
                <img
                    alt="Printer on wooden floor with papers and plant casting shadows"
                    className="w-full h-[600px] object-cover"
                    height="600"
                    src="images/12345.jpg"
                    width="1920"
                />
                {/* Black opacity overlay */}
                <div className="absolute inset-0 bg-black opacity-60" style={{ maxHeight: "600px" }}></div>
                {/* Content above overlay */}
                <div
                    className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 xl:px-48 max-w-7xl mx-auto"
                    style={{ maxHeight: "600px", zIndex: 10 }}
                >
                    <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight max-w-3xl">
                        MANAGING PDF IN THE CLOUD:
                        <br />
                        WHAT YOU NEED TO KNOW
                    </h1>
                    <p className="text-white text-base sm:text-lg max-w-2xl mt-4 leading-relaxed">
                        Whether you're managing invoices, contracts, or school documents,
                        cloud-based PDF workflows save time and add flexibility.
                    </p>
                    <div className="flex flex-wrap items-center text-white text-xs sm:text-sm mt-6 space-x-3 max-w-3xl">
                        <span className="font-normal">by Joanna Wellick</span>
                        <span>—</span>
                        <span className="flex items-center space-x-1">
                            <i className="far fa-clock"></i>
                            <span>2 minute read</span>
                        </span>
                        <span>—</span>
                        <span className="flex items-center space-x-1">
                            <i className="fas fa-chart-bar"></i>
                            <span>1.6K views</span>
                        </span>
                        <span>—</span>
                        <span className="flex items-center space-x-1">
                            <i className="fa-brands fa-facebook"></i>
                            <i className="fab fa-twitter"></i>
                            <i className="fa-brands fa-pinterest"></i>
                            <span>1.2K shares</span>
                        </span>
                    </div>
                </div>
            </div>


            <div className="bg-[#f5f8fa] text-[13px] font-sans text-[#222222]">
  <div className=" mx-auto px-15 py-15 flex flex-col lg:flex-row gap-8">
   <main className="flex-1" style={{ paddingLeft: "125px" }}>
    <section className="mb-8">
    <p className="mb-6 text-base leading-relaxed">
    Storing and managing PDFs in the cloud has become essential for both individuals and teams handling digital documents. With platforms like Google Drive, Dropbox, and OneDrive, you can access, share, and collaborate on files from anywhere, anytime.
  </p>

  <div className="mb-6">
    <p className="font-extrabold mb-2" style={{ fontSize: "20px" }}>Key Benefits:</p>
    <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed">
      <li><span className="font-normal">Accessibility – Open your PDFs from any device, without emailing attachments.</span></li>
      <li><span className="font-normal">Version Control – Avoid confusion with automatic saving and file history.</span></li>
      <li><span className="font-normal">Collaboration – Commenting, editing, and sharing links streamline teamwork.</span></li>
      <li><span className="font-normal">Security – Most cloud platforms offer encryption and access control.</span></li>
    </ul>
  </div>

  <div className="flex items-start mb-8">
    <img
  src="images/coma.png"
  alt="Comma icon"
  className="flex-shrink-0 mt-1 mr-3"
  width={24}
  height={32}
/>
    <p className="uppercase text-gray-900 text-sm leading-tight tracking-wide font-normal max-w-[90%]">
      THE CLOUD ISN'T JUST STORAGE—IT'S THE NEW WORKSPACE. MANAGING PDFS ONLINE MEANS YOUR DOCUMENTS MOVE AS FAST AS YOUR IDEAS.
    </p>
  </div>

  <div className="mb-6">
    <p className="font-extrabold mb-1 text-base" style={{ fontSize: "20px" }}>Pro Tools &amp; Integrations</p>
    <p className="text-sm mb-1">Smart integrations between cloud services and online PDF tools streamline your workflow even further. For example:</p>
    <ul className="list-disc list-inside space-y-1 text-sm mb-1 leading-relaxed">
      <li>Open a PDF from Google Drive in a PDF editor directly.</li>
      <li>Compress large documents before emailing, straight from the cloud.</li>
      <li>Add e-signatures to contracts and save back to Dropbox in one click.</li>
    </ul>
    <p className="text-sm">Look for tools that support OAuth login, direct cloud importing/exporting, and batch processing features.</p>
  </div>

  <div className="mb-6">
    <p className="font-extrabold mb-1 text-base" style={{ fontSize: "20px" }}>Use Cases by Profession</p>
    <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed">
      <li>Freelancers: Submit invoices and portfolios with cloud-based eSign and compression.</li>
      <li>HR Teams: Manage contracts, resumes, and onboarding docs with shared folders.</li>
      <li>Students &amp; Educators: Store course materials, projects, and assignments for easy access.</li>
      <li>Legal/Finance Professionals: Archive confidential agreements with password protection and controlled access.</li>
    </ul>
  </div>

  <div className="mb-6">
    <p className="font-extrabold mb-1 text-base" style={{ fontSize: "20px" }}>Things to Watch Out For</p>
    <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed">
      <li>Storage Limits: Free accounts often come with caps; monitor usage or consider upgrading.</li>
      <li>File Sync Delays: Make sure sync is complete before closing or sharing edited PDFs.</li>
      <li>Offline Access: Enable offline mode for critical documents when traveling or in low-connectivity areas.</li>
    </ul>
  </div>

  <div>
    <p className="font-extrabold mb-1 text-base" style={{ fontSize: "20px" }}>Final Thoughts</p>
    <p className="text-sm leading-relaxed">
      Whether you're managing invoices, contracts, school documents, or design proofs, cloud-based PDF workflows offer a modern, efficient, and scalable solution. The key is choosing the right tools and learning how to integrate them seamlessly with your existing cloud storage setup.
    </p>
  </div>
    </section>
    
    <section className="mb-8">
     <div className="max-w-4xl w-full">
   <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
    <div className="flex flex-col items-center md:items-start md:w-24 mb-6 md:mb-0">
     <span className="text-lg font-semibold text-[#1a1a1a]">
      10K
     </span>
     <span className="text-sm font-semibold text-gray-500">
      Shares
     </span>
    </div>
    <div className="flex flex-wrap gap-4 flex-1">
     <button aria-label="Facebook shares" className="flex items-center bg-[#3b5998] text-white font-semibold rounded-md px-6 py-3 space-x-2 min-w-[160px]">
      <i className="fab fa-facebook-f text-white text-base">
      </i>
      <span>
       Shares
      </span>
      <span className="font-bold">
       636
      </span>
     </button>
     <button aria-label="Pinterest shares" className="flex items-center bg-[#ff0000] text-white font-semibold rounded-md px-6 py-3 space-x-2 min-w-[160px]">
      <i className="fab fa-pinterest-p text-white text-base">
      </i>
      <span>
       Shares
      </span>
      <span className="font-bold">
       636
      </span>
     </button>
     <button aria-label="LinkedIn shares" className="flex items-center bg-[#0077b5] text-white font-semibold rounded-md px-6 py-3 space-x-2 min-w-[100px]">
      <i className="fab fa-linkedin-in text-white text-base">
      </i>
      <span className="font-semibold text-white">
       636
      </span>
     </button>
    </div>
   </div>
   <div className="flex items-center space-x-6 mt-12">
    <img alt="Woman with black hair wearing yellow top in wooden background" className="w-20 h-20 rounded-full object-cover" height="80" src="https://storage.googleapis.com/a1aa/image/2a612e9d-8ac5-47c8-83d0-fd4dccf63f05.jpg" width="80"/>
    <div className="flex-1">
     <h2 className="font-bold text-lg text-[#1a1a1a] mb-2">
      Joanna Wellick
     </h2>
     <p className="text-gray-600 text-base max-w-xl leading-relaxed">
      Sed cras nec a nulla sapien adipiscing ut etiam. In sem viverra mollis metus quam adipiscing vel nascetur condimentum felis sapien. Pede consequat laoreet enim sit aliquet mollis semper.
     </p>
     <div className="flex space-x-3 mt-4">
      <a aria-label="Dribbble" className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs" href="#">
       <i className="fab fa-dribbble">
       </i>
      </a>
      <a aria-label="Behance" className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs" href="#">
       <i className="fab fa-behance">
       </i>
      </a>
      <a aria-label="GitHub" className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs" href="#">
       <i className="fab fa-github">
       </i>
      </a>
      <a aria-label="Flickr" className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs" href="#">
       <i className="fab fa-flickr">
       </i>
      </a>
     </div>
    </div>
   </div>
   <div className="flex justify-center mt-12">
    <button aria-label="View Comments" className="bg-[#3a3f47] text-white text-base font-normal rounded-md px-8 py-3">
     View Comments (0)
    </button>
   </div>
  </div>
    </section>


   </main>
   <aside className="w-full lg:w-[280px] flex flex-col gap-8">
    <section>
     <div className="max-w-xs">
    <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Follow Us</h2>
    <div className="flex space-x-8 mb-8">
      <div className="flex flex-col items-center text-gray-900 text-sm font-semibold">
        <i className="fab fa-facebook-f text-xl"></i>
        <span className="mt-1">10</span>
      </div>
      <div className="flex flex-col items-center text-gray-900 text-sm font-semibold">
        <i className="fab fa-twitter text-xl"></i>
        <span className="mt-1">69k</span>
      </div>
      <div className="flex flex-col items-center text-gray-900 text-sm font-semibold">
        <i className="fab fa-instagram text-xl"></i>
        <span className="mt-1">45</span>
      </div>
      <div className="flex flex-col items-center text-gray-900 text-sm font-semibold">
        <i className="fab fa-pinterest-p text-xl"></i>
        <span className="mt-1">69k</span>
      </div>
      <div className="flex flex-col items-center text-gray-900 text-sm font-semibold">
        <i className="fab fa-youtube text-xl"></i>
        <span className="mt-1">69k</span>
      </div>
    </div>

    <p className="text-gray-900 text-base mb-4">
      <strong className="font-extrabold">Subscription:</strong> Subscribe to our newsletter and receive a selection of cool articles every weeks
    </p>

    <input
      type="email"
      placeholder="Enter your email"
      className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
    />
    <button
      className="w-full bg-[#0a0a3a] text-white font-extrabold text-lg py-3 rounded-xl mb-6"
    >
      Subscribe
    </button>

    <label className="flex items-start space-x-3 text-gray-400 text-sm leading-relaxed cursor-pointer">
      <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 focus:ring-indigo-600" />
      <span>
        By checking this box, you confirm that you have read and are agreeing to our terms of use regarding the storage of the data submitted through this form.
      </span>
    </label>
  </div>

    </section>
    <section>
     <h2 className="text-black text-lg font-normal mb-4">
    The Latest
   </h2>
   <article aria-label="Featured article with city buildings background" className="relative bg-black text-white rounded-md overflow-hidden mb-4">
  <img
    alt="Tall city buildings with sunlight shining between them"
    className="w-full h-36 object-cover absolute inset-0"
    height={150}
    src="https://storage.googleapis.com/a1aa/image/de0e88ba-4bd1-4134-eeca-3453cd59c4bf.jpg"
    width={400}
  />
  <div className="relative p-4">
    <h3 className="font-bold text-sm leading-snug mb-3">
      10 Habits That Will Change Your Live for the Better If envy and jealousy are impacting your friendships
    </h3>
    <div className="flex items-center text-sm font-semibold space-x-4">
      <span>June 21, 2022</span>
      <span>—</span>
      <span className="flex items-center space-x-2">
        <i className="far fa-clock"></i>
        <span>2 minute read</span>
      </span>
    </div>
  </div>
</article>
<article className="bg-white rounded-md p-4 mb-4">
  <h3 className="font-bold text-sm mb-3">
    Automate Repetitive PDF Tasks with These Shortcuts
  </h3>
  <div className="flex items-center text-sm font-semibold text-gray-900 space-x-4">
    <span>June 21, 2022</span>
    <span>—</span>
    <span className="flex items-center space-x-2">
      <i className="far fa-clock"></i>
      <span>2 minute read</span>
    </span>
  </div>
</article>
<article className="bg-white rounded-md p-4 mb-4">
  <h3 className="font-bold text-sm mb-3">
    Weekly Workflow: How We Use Our Own Tools Internally
  </h3>
  <p className="text-sm text-gray-900 mb-3 invisible">
    placeholder
  </p>
  <div className="flex items-center text-sm font-semibold text-gray-900 space-x-4">
    <span>June 21, 2022</span>
    <span>—</span>
    <span className="flex items-center space-x-2">
      <i className="far fa-clock"></i>
      <span>2 minute read</span>
    </span>
  </div>
</article>
<article className="bg-white rounded-md p-4">
  <h3 className="font-bold text-sm mb-3">
    From Idea to Launch: The Story Behind Our PDF Compressor
  </h3>
  <p className="text-sm text-gray-900 mb-3 invisible">
    placeholder
  </p>
  <div className="flex items-center text-sm font-semibold text-gray-900 space-x-4">
    <span>June 21, 2022</span>
    <span>—</span>
    <span className="flex items-center space-x-2">
      <i className="far fa-clock"></i>
      <span>2 minute read</span>
    </span>
  </div>
</article>
    </section>

    <section className="bg-white rounded shadow-sm p-6 text-center text-[11px] text-[#999999]">
     <div className="bg-white max-w-xs w-fulltext-center">
   <p className="text-black font-bold text-sm tracking-widest mb-3">
    AUTHOR
   </p>
   <h2 className="text-black font-extrabold text-xl mb-5">
    Joanna Wellick
   </h2>
   <img
    alt="Portrait of a woman with red hair smiling and resting her hand on her cheek"
    className="w-24 h-24 rounded-full mx-auto mb-5 object-cover"
    height={100}
    src="https://storage.googleapis.com/a1aa/image/bc154ec4-a9f5-4ed3-34bd-6f80ec54e4c0.jpg"
    width={100}
  />
   <p className="text-gray-400 text-center text-base leading-relaxed mb-6 px-4">
    Luci vitae dapibus rhoncus. Eget etiam aenean nisi montes felis pretium donec veni. Pede...
   </p>
   <div className="flex justify-center space-x-4">
    <a className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-xs" href="#">
     <i className="fab fa-dribbble">
     </i>
    </a>
    <a className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-xs" href="#">
     <i className="fab fa-behance">
     </i>
    </a>
    <a className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-xs" href="#">
     <i className="fab fa-github">
     </i>
    </a>
    <a className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-xs" href="#">
     <i className="fab fa-medium-m">
     </i>
    </a>
   </div>
  </div>
    </section>
   </aside>
  </div>
 </div>

 <section className=" bg-[#f5f8fa] px-15 mx-auto py-12">
  <h2 className="font-semibold text-lg mb-8">
    RELATED POSTS
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
    {/* Post 1 */}
    <article>
      <div className="relative">
        <img
          alt="Abstract orange and red layered curves with a spiral center"
          className="w-full h-[250px] object-cover"
          height={250}
          src="https://storage.googleapis.com/a1aa/image/d912ac61-0d0c-44e0-a85b-fa3e768bdaf4.jpg"
          width={400}
        />
        <div className="absolute top-4 left-4 flex space-x-2">
          <span
            className=" text-white text-[13px] font-normal px-3 py-[2px] rounded backdrop-blur-sm"
            style={{ color: "white" }}
          >
            Document Management
          </span>
          <span
            className=" text-white text-[13px] font-normal px-3 py-[2px] rounded backdrop-blur-sm"
            style={{ color: "white" }}
          >
            Workflow
          </span>
        </div>
      </div>
      <h3 className="mt-4 font-semibold text-lg leading-tight">
        How to Merge PDFs in Seconds
      </h3>
      <p className="mt-2 text-sm text-[#6b7280] leading-relaxed">
        The simplest way to combine multiple files without losing quality.
      </p>
      <div className="mt-6 flex items-center text-[11px] text-[#475569] font-normal space-x-3">
        <time>June 21,2022</time>
        <span className="inline-block w-6 border-t border-[#475569]"></span>
        <div className="flex items-center space-x-1">
          <i className="far fa-clock text-[12px]"></i>
          <span>2 minute read</span>
        </div>
      </div>
    </article>
    {/* Post 2 */}
    <article>
      <div className="relative">
        <img
          alt="Colorful fluorescent tubes in yellow, green, and blue hues"
          className="w-full h-[250px] object-cover"
          height={250}
          src="https://storage.googleapis.com/a1aa/image/becf4f68-57e2-48b6-a124-a943449340f8.jpg"
          width={400}
        />
        <div className="absolute top-4 left-4 flex space-x-2">
          <span
            className=" text-white text-[13px] font-normal px-3 py-[2px] rounded backdrop-blur-sm"
            style={{ color: "white" }}
          >
            Document Management
          </span>
          <span
            className=" text-white text-[13px] font-normal px-3 py-[2px] rounded backdrop-blur-sm"
            style={{ color: "white" }}
          >
            Workflow
          </span>
        </div>
      </div>
      <h3 className="mt-4 font-semibold text-lg leading-tight">
        Add E-Signatures to PDFs—Legally and Fast
      </h3>
      <p className="mt-2 text-sm text-[#6b7280] leading-relaxed">
        A guide to signing documents online with compliance in mind.
      </p>
      <div className="mt-6 flex items-center text-[11px] text-[#475569] font-normal space-x-3">
        <time>June 21,2022</time>
        <span className="inline-block w-6 border-t border-[#475569]"></span>
        <div className="flex items-center space-x-1">
          <i className="far fa-clock text-[12px]"></i>
          <span>2 minute read</span>
        </div>
      </div>
    </article>
    {/* Post 3 */}
    <article>
      <div className="relative">
        <img
          alt="Man with a backpack looking at a mountain lake with cloudy sky"
          className="w-full h-[250px] object-cover"
          height={250}
          src="https://storage.googleapis.com/a1aa/image/934fad8d-8268-4a9f-5495-878b4b72d6a7.jpg"
          width={400}
        />
        <div className="absolute top-4 left-4 flex space-x-2">
          <span
            className=" text-white text-[13px] font-normal px-3 py-[2px] rounded backdrop-blur-sm"
            style={{ color: "white" }}
          >
            Document Management
          </span>
          <span
            className=" text-white text-[13px] font-normal px-3 py-[2px] rounded backdrop-blur-sm"
            style={{ color: "white" }}
          >
            Workflow
          </span>
        </div>
      </div>
      <h3 className="mt-4 font-semibold text-lg leading-tight">
        Managing PDFs in the Cloud: What You Need to Know
      </h3>
      <p className="mt-2 text-sm text-[#6b7280] leading-relaxed">
        Benefits and best practices for online storage and access.
      </p>
      <div className="mt-6 flex items-center text-[11px] text-[#475569] font-normal space-x-3">
        <time>June 21,2022</time>
        <span className="inline-block w-6 border-t border-[#475569]"></span>
        <div className="flex items-center space-x-1">
          <i className="far fa-clock text-[12px]"></i>
          <span>2 minute read</span>
        </div>
      </div>
    </article>
  </div>
  <div className="mt-12 flex justify-center">
    <button
      className="bg-[#0c1140] text-white text-sm font-semibold px-6 py-2 rounded-md hover:bg-[#0a0e33] transition"
      type="button"
    >
      Load More
    </button>
  </div>
</section>
        </>
    );
};

export default ExtendBlog;
"use client";
import React, { useState } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Local JSON data for posts
const postsData = [
	{
		id: 1,
		title: "How to Convert a PDF to Word Without Losing Format",
		description: "A step-by-step guide for accurate file conversion.",
		category: "Guides",
		date: "08.08.2021",
		imageUrl: "images/cards/guides.jpg",
		altText: "Silhouettes of people standing in a modern office with large windows showing a city skyline",
	},
	{
		id: 2,
		title: "Tool Spotlight: How Our PDF Compressor Works",
		description:
			"Lesser-known features to boost efficiency. A behind-the-scenes look at the compression algorithm.",
		category: "Tools",
		date: "08.08.2021",
		imageUrl: "images/cards/tools1.jpg",
		altText: "Person sitting at desk working on a laptop showing PDF compressor software",
	},
	{
		id: 3,
		title: "How to Create a Paperless Workflow Using PDF Tools",
		description: "Go digital and stay efficient.",
		category: "Workflow",
		date: "08.08.2021",
		imageUrl: "images/cards/workflow.jpg",
		altText: "Sumup receipt printer on a marble table with a bowl of tomatoes and a person in background",
	},
	{
		id: 4,
		title: "Are Online PDF Tools Secure? What to Check",
		description: "Know the risks and how we protect your data.",
		category: "Security",
		date: "08.08.2021",
		imageUrl: "images/cards/security1.jpg",
		altText: "Two people smiling and working on laptops at a wooden table in a modern office",
	},
	{
		id: 5,
		title: "New Feature Release: Drag & Drop Redesign",
		description: "Improving ease of use and performance.",
		category: "Updates",
		date: "08.08.2021",
		imageUrl: "images/cards/updates.jpg",
		altText: "Sunset view through a natural rock arch in a desert landscape with orange sky",
	},
	{
		id: 6,
		title: "The Complete Guide to Compressing PDFs Online",
		description: "Shrink file size without sacrificing quality.",
		category: "Guides",
		date: "08.08.2021",
		imageUrl: "images/cards/guides2.jpg",
		altText: "Coffee cup and printer with receipt on a table in a bright office setting",
	},
	{
		id: 7,
		title: "Why Our Merge Tool Is Smarter Than Drag-and-Drop",
		description: "Features that make merging faster and cleaner.",
		category: "Tools",
		date: "08.08.2021",
		imageUrl: "images/cards/tools2.jpg",
		altText: "Blue glass building architecture with reflections of sky and clouds",
	},
	{
		id: 8,
		title: "How to Create a Paperless Workflow Using PDF Tools",
		description: "Go digital and stay efficient.",
		category: "Workflow",
		date: "08.08.2021",
		imageUrl: "images/cards/workflow1.jpg",
		altText: "People walking in a modern office building hallway with white walls and glass",
	},
];

const PrinTableBlog: React.FC = () => {
	// State for selected category
	const [selectedCategory, setSelectedCategory] = useState("All");

	// Categories for the menu
	const categories = [
		"All",
		"Guides",
		"Tools",
		"Workflow",
		"Security",
		"Updates",
	];

	// Filter posts based on selected category
	const filteredPosts =
		selectedCategory === "All"
			? postsData
			: postsData.filter((post) => post.category === selectedCategory);

	return (
		<>
			{/* Hero Section */}
			<div className="relative min-h-screen flex items-center justify-center text-center text-white">
				<img
					alt="Close-up photo of a tablet with a white and pink case lying on an open book, showing a blog page on the tablet screen"
					className="absolute inset-0 w-full h-full object-cover brightness-50"
					height="720"
					src="/images/1234.jpg"
					width="1280"
				/>
				<div className="relative max-w-3xl px-6">
					<h1 className="font-extrabold text-[70px] leading-tight">
						PrinTable Blog
					</h1>
					<h2 className="font-normal text-[60px] mt-1 leading-tight whitespace-nowrap">
						Work Fast. Work Clean.
					</h2>
					<p className="mt-6 text-sm sm:text-base max-w-xl mx-auto">
						Explore guides, updates, and insights to master your digital
						documents.
					</p>
					<button className="mt-8 bg-[#0a0a4a] px-6 py-2 rounded text-sm font-semibold hover:bg-[#0c0c6c] transition-colors">
						Explore
					</button>
				</div>
			</div>

			{/* Clients Section */}
			<section id="clients" className="clients py-10 bg-[#FAFAFA]">
				<div
					className="container mx-auto px-4"
					data-aos="fade-up"
					data-aos-delay="100"
				>
					<Swiper
						modules={[Autoplay]}
						loop={true}
						speed={600}
						autoplay={{
							delay: 5000,
							disableOnInteraction: false,
						}}
						breakpoints={{
							320: { slidesPerView: 2, spaceBetween: 40 },
							480: { slidesPerView: 3, spaceBetween: 60 },
							640: { slidesPerView: 4, spaceBetween: 80 },
							992: { slidesPerView: 6, spaceBetween: 120 },
						}}
						className="mySwiper"
					>
						<SwiperSlide>
							<div className="flex items-center space-x-3">
								<img
									src="images/google.png"
									className="w-12 h-12 object-contain opacity-50 transition-opacity duration-300 hover:opacity-100"
									alt="Client 1"
								/>
								<h3 className="text-lg font-bold text-black">Google</h3>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="flex items-center space-x-3">
								<img
									src="images/logoipsum.png"
									className="w-12 h-12 object-contain opacity-50 transition-opacity duration-300 hover:opacity-100"
									alt="Client 2"
								/>
								<h3 className="text-lg font-bold text-black">Logoipsum</h3>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="flex items-center space-x-3">
								<img
									src="images/logoipsum2.png"
									className="w-12 h-12 object-contain opacity-50 transition-opacity duration-300 hover:opacity-100"
									alt="Client 3"
								/>
								<h3 className="text-lg font-bold text-black">Logoipsum</h3>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="flex items-center space-x-3">
								<img
									src="images/x.png"
									className="w-12 h-12 object-contain opacity-50 transition-opacity duration-300 hover:opacity-100"
									alt="Client 4"
								/>
								<h3 className="text-lg font-bold text-black">Twitter</h3>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="flex items-center space-x-3">
								<img
									src="images/google.png"
									className="w-12 h-12 object-contain opacity-50 transition-opacity duration-300 hover:opacity-100"
									alt="Client 5"
								/>
								<h3 className="text-lg font-bold text-black">Google</h3>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="flex items-center space-x-3">
								<img
									src="images/google.png"
									className="w-12 h-12 object-contain opacity-50 transition-opacity duration-300 hover:opacity-100"
									alt="Client 6"
								/>
								<h3 className="text-lg font-bold text-black">Google</h3>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="flex items-center space-x-3">
								<img
									src="images/google.png"
									className="w-12 h-12 object-contain opacity-50 transition-opacity duration-300 hover:opacity-100"
									alt="Client 7"
								/>
								<h3 className="text-lg font-bold text-black">Google</h3>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>
			</section>

			{/* Featured Post Section */}
			<div className="relative w-full overflow-visible px-15">
				<img
					alt="Printer on wooden floor with photos and shadows of plants"
					className="w-full h-auto object-cover"
					height="650"
					src="images/12345.jpg"
					width="1200"
					style={{
						paddingBottom: "100px",
						borderTopLeftRadius: "15px",
						borderTopRightRadius: "15px",
					}}
				/>
				<div
					className="absolute top-[300px] left-[1005px] -translate-x-1/2 translate-y-1/2 bg-white rounded-xl p-8 max-w-4xl w-[90%] shadow-lg"
					style={{
						boxShadow:
							"0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
					}}
				>
					<div className="flex flex-wrap items-center gap-4 mb-2 text-sm font-semibold text-gray-700">
						<span className="uppercase">Development</span>
						<span className="text-gray-400 font-normal">16 March 2023</span>
					</div>
					<h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-4">
						Managing PDFs in the Cloud: What You <br /> Need to Know
					</h1>
					<p className="text-gray-600 text-base max-w-3xl mb-6">
						Storing and managing PDFs in the cloud has become essential for both
						individuals and teams handling digital documents. With platforms like
						Google Drive, Dropbox, and OneDrive, you can access, share, and
						collaborate on files from anywhere, anytime.
					</p>
					<button
						className="bg-[#0a0a3d] text-white font-semibold rounded-md px-6 py-3 hover:bg-[#0a0a3d]/90 transition"
						type="button"
					>
						Read More
					</button>
				</div>
			</div>

			{/* Recent Post Section */}
			<section className="mx-auto px-15">
				<h1 className="text-gray-900 font-semibold text-[35px] mb-6">
					Our Recent Post
				</h1>
				<div className="flex flex-col md:flex-row md:space-x-8">
					<div className="md:flex-1">
						<img
							alt="Printer on wooden floor with photos and a plant casting shadows"
							className="rounded-lg w-full object-cover"
							height="320"
							src="images/12345.jpg"
							width="600"
						/>
					</div>
					<div className="md:flex-1 mt-6 md:mt-0">
						<div className="flex flex-wrap items-center text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
							<span>Development</span>
							<span className="text-gray-400 font-normal">16 March 2023</span>
						</div>
						<h1 className="text-gray-900 font-extrabold text-2xl leading-snug mb-8">
							Managing PDFs in the Cloud: What You Need <br />to Know
						</h1>
						<p className="text-gray-600 text-sm mb-6 max-w-xl">
							Storing and managing PDFs in the cloud has become essential for both
							individuals and teams handling digital documents. With platforms like
							Google Drive, Dropbox, and OneDrive, you can access, share, and
							collaborate on files from anywhere, anytime.
						</p>
						<button
							className="bg-[#00003C] text-white text-xs font-semibold px-4 py-1 rounded"
							type="button"
							style={{
								width: "110px",
								height: "35px",
								borderRadius: "10px",
							}}
						>
							Read More
						</button>
					</div>
				</div>
			</section>

			{/* Cards Section with JSON Data and Menu Highlight */}
			<section className="cards mx-auto px-15 py-10">
				<header className="flex justify-between items-center mb-8">
					<h1 className="text-4xl font-semibold leading-tight text-[#495057]">
						Popular Posts
					</h1>
				</header>
				<nav className="flex gap-6 mb-8 text-xs font-semibold text-[#3a4551] flex-wrap">
					{categories.map((category) => (
						<a
							key={category}
							className={`hover:underline ${
								selectedCategory === category ? "text-[#b36f00]" : ""
							}`}
							href="#"
							onClick={(e) => {
								e.preventDefault();
								setSelectedCategory(category);
							}}
							aria-current={
								selectedCategory === category ? "page" : undefined
							}
						>
							{category}
						</a>
					))}
					<a className="hover:underline ml-auto" href="#">
						View All
					</a>
				</nav>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
					{filteredPosts.map((post) => (
						<a
							key={post.id}
							href="#"
							className="block group"
							style={{ textDecoration: "none" }}
						>
							<article className="cursor-pointer transition-shadow hover:shadow-lg h-full">
								<div className="relative mb-3">
									<img
										alt={post.altText}
										className="w-full h-[225px] object-cover rounded"
										height="225"
										src={post.imageUrl}
										width="360"
									/>
									<span className="absolute top-2 right-2 bg-[#3a4551] text-white text-[9px] font-semibold px-2 py-[2px] rounded">
										{post.category}
									</span>
								</div>
								<time className="block text-[10px] text-[#7a8a99] mb-1">
									{post.date}
								</time>
								<h3 className="text-sm font-semibold leading-tight mb-1 group-hover:underline">
									{post.title}
								</h3>
								<p className="text-[11px] text-[#7a8a99] leading-snug">
									{post.description}
								</p>
							</article>
						</a>
					))}
				</div>
			</section>
		</>
	);
};

export default PrinTableBlog;
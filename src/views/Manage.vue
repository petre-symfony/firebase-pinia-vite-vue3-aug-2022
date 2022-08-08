<script setup>

</script>
<template>
	<section className="container mx-auto mt-6">
		<div className="md:grid md:grid-cols-3 md:gap-4">
			<div className="col-span-1">
				<div className="bg-white rounded border border-gray-200 relative flex flex-col">
					<div className="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
						<span className="card-title">Upload</span>
						<i className="fas fa-upload float-right text-green-400 text-2xl"></i>
					</div>
					<div className="p-6">
						<div
							className="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed
                border-gray-400 text-gray-400 transition duration-500 hover:text-white
                hover:bg-green-400 hover:border-green-400 hover:border-solid">
							<h5>Drop your files here</h5>
						</div>
						<hr className="my-6"/>
						<div className="mb-4">
							<div className="font-bold text-sm">Just another song.mp3</div>
							<div className="flex h-4 overflow-hidden bg-gray-200 rounded">
								<div className="transition-all progress-bar bg-blue-400" style="width: 75%"></div>
							</div>
						</div>
						<div className="mb-4">
							<div className="font-bold text-sm">Just another song.mp3</div>
							<div className="flex h-4 overflow-hidden bg-gray-200 rounded">
								<div className="transition-all progress-bar bg-blue-400" style="width: 35%"></div>
							</div>
						</div>
						<div className="mb-4">
							<div className="font-bold text-sm">Just another song.mp3</div>
							<div className="flex h-4 overflow-hidden bg-gray-200 rounded">
								<div className="transition-all progress-bar bg-blue-400" style="width: 55%"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-span-2">
				<div className="bg-white rounded border border-gray-200 relative flex flex-col">
					<div className="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
						<span className="card-title">My Songs</span>
						<i className="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
					</div>
					<div className="p-6">
						<div className="border border-gray-200 p-3 mb-4 rounded">
							<div>
								<h4 className="inline-block text-2xl font-bold">Song Name</h4>
								<button className="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
									<i className="fa fa-times"></i>
								</button>
								<button className="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right">
									<i className="fa fa-pencil-alt"></i>
								</button>
							</div>
							<div>
								<form>
									<div className="mb-3">
										<label className="inline-block mb-2">Song Title</label>
										<input type="text"
													 className="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
													 placeholder="Enter Song Title"/>
									</div>
									<div className="mb-3">
										<label className="inline-block mb-2">Genre</label>
										<input type="text"
													 className="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
													 placeholder="Enter Genre"/>
									</div>
									<button type="submit" className="py-1.5 px-3 rounded text-white bg-green-600">
										Submit
									</button>
									<button type="submit" className="py-1.5 px-3 rounded text-white bg-gray-600">
										Go Back
									</button>
								</form>
							</div>
						</div>
						<div className="border border-gray-200 p-3 mb-4 rounded">
							<div>
								<h4 className="inline-block text-2xl font-bold">Song Name</h4>
								<button className="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
									<i className="fa fa-times"></i>
								</button>
								<button className="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right">
									<i className="fa fa-pencil-alt"></i>
								</button>
							</div>
						</div>
						<div className="border border-gray-200 p-3 mb-4 rounded">
							<div>
								<h4 className="inline-block text-2xl font-bold">Song Name</h4>
								<button className="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
									<i className="fa fa-times"></i>
								</button>
								<button className="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right">
									<i className="fa fa-pencil-alt"></i>
								</button>
							</div>
						</div>
						<div className="border border-gray-200 p-3 mb-4 rounded">
							<div>
								<h4 className="inline-block text-2xl font-bold">Song Name</h4>
								<button className="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
									<i className="fa fa-times"></i>
								</button>
								<button className="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right">
									<i className="fa fa-pencil-alt"></i>
								</button>
							</div>
						</div>
						<div className="border border-gray-200 p-3 mb-4 rounded">
							<div>
								<h4 className="inline-block text-2xl font-bold">Song Name</h4>
								<button className="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
									<i className="fa fa-times"></i>
								</button>
								<button className="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right">
									<i className="fa fa-pencil-alt"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: "Manage"
}
</script>

<style scoped>
</style>

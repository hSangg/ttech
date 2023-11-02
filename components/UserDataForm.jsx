"use client"
import { motion } from "framer-motion"
import {
	useEffect,
	useRef,
	useState,
} from "react"
import {
	isValidEmail,
	isValidPhoneNumber,
} from "../utils/until"
import { UserAuth } from "@/context/AuthContext"

const UserDataForm = () => {
	const buttonRef = useRef()
	const { user, setUser } = UserAuth()

	useEffect(() => {
		setUser(
			JSON.parse(localStorage.getItem("user"))
		)

		console.log(user)
	}, [])

	const [formData, setFormData] = useState({
		name: user.name,
		sex: "Nam",
		email: user.email,
		phoneNumber: user.phone,
	})

	const [formErrors, setFormErrors] = useState({
		name: "",
		email: "",
		phoneNumber: "",
	})

	const [isValidFormData, setIsValidFormData] =
		useState(() => {
			return Object.values(formErrors).every(
				(x) => x === ""
			)
		})

	const handleInputChange = (e) => {
		const { id, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[id]: value,
		}))

		let errorMessage = ""
		if (!value.trim()) {
			errorMessage = `Vui lòng nhập ${
				id === "name"
					? "tên"
					: id === "email"
					? "email"
					: "số điện thoại"
			}`
		} else if (
			id === "email" &&
			!isValidEmail(value)
		) {
			errorMessage = "Sai định dạng email"
		} else if (
			id === "phoneNumber" &&
			!isValidPhoneNumber(value)
		) {
			errorMessage =
				"Số điện thoại gồm 10 hoặc 11 con số"
		}

		setFormErrors((prevErrors) => ({
			...prevErrors,
			[id]: errorMessage,
		}))
	}

	const handleSexChange = (e) => {
		setFormData((prevData) => ({
			...prevData,
			sex: e.target.value,
		}))
	}

	const showInforCustomer = () => {
		console.log(formData)
	}

	useEffect(() => {
		setIsValidFormData(
			Object.values(formErrors).every(
				(x) => x === ""
			)
		)
	}, [formErrors, formData])

	return (
		<div className='grid grid-cols-1 mt-5'>
			<div className=' text-white'>
				<h1
					onClick={showInforCustomer}
					className='text-[1.7rem] text-left px-2 text-black font-[700] capitalize'
				>
					Thông tin tài khoản
				</h1>
				<div className='w-full bg-slate-200/50 text-black text-[1.5rem]'>
					<form className='grid grid-cols-1 gap-2 px-4'>
						{[
							{
								labelName: "Họ và tên",
								type: "text",
								inputName: "name",
							},
							{
								labelName: "Email",
								type: "email",
								inputName: "email",
							},
							{
								labelName: "Số điện thoại",
								type: "tel",
								inputName: "phoneNumber",
							},
						].map(
							({ labelName, type, inputName }, i) => (
								<div key={i}>
									<div className='flex flex-col '>
										<motion.label
											className='text-black/70 text-[1.4rem] font-[600]'
											htmlFor={inputName}
										>
											{labelName}
										</motion.label>
										<motion.input
											whileFocus={{
												borderColor: "#2563eb",
												color: "#172554",
											}}
											style={{
												borderColor:
													formErrors[inputName] == ""
														? "gray"
														: "red",
											}}
											onChange={handleInputChange}
											className='py-1 w-full outline-none border-[1px] border-gray-500/60 px-4 rounded-xl bg-slate-200'
											id={inputName}
											type={type}
											value={formData[inputName]}
										/>
									</div>
									<h2 className='error-message text-[1rem] mt-2 text-red-500'>
										{formErrors[inputName]}
									</h2>
								</div>
							)
						)}

						<div></div>
						<div className='self-center'>
							<div className='flex items-center gap-2'>
								<div className='pr-4'>Giới tính</div>
								<div className='flex gap-1'>
									<input
										type='radio'
										id='contactChoice1'
										name='gioitinh'
										value='Nam'
										checked={formData.sex === "Nam"}
										onChange={handleSexChange}
									/>
									<label htmlFor='contactChoice1'>
										Nam
									</label>
								</div>
								<div className='flex gap-1 ml-2'>
									<input
										type='radio'
										id='contactChoice2'
										name='gioitinh'
										value='Nữ'
										checked={formData.sex === "Nữ"}
										onChange={handleSexChange}
									/>
									<label htmlFor='contactChoice2'>
										Nữ
									</label>
								</div>
							</div>
						</div>
						<motion.button
							ref={buttonRef}
							disabled={!isValidFormData}
							animate={{
								backgroundColor: isValidFormData
									? "#0284c7"
									: "#78716c",
							}}
							className='w-full py-2 font-[700] text-white rounded-2xl text-center'
						>
							SUBMIT
						</motion.button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default UserDataForm

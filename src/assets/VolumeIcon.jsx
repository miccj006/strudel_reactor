export default function Volume({ volume, maxVolume, isMute }) {
	const icon = () => {
		if (isMute) { return "mute" }
		if (volume <= maxVolume * 0.33) { return "low" }
		if (volume <= maxVolume * 0.66) { return "med" }
		return "high"
	}
	return (
		<svg width="20" height="20" viewBox="-2 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<symbol id="mute">
				<path d="M8 1H6L2 5H0V11H2L6 15H8V1Z" fill="#000000" />
				<path d="M9.29289 6.20711L11.0858 8L9.29289 9.79289L10.7071 11.2071L12.5 9.41421L14.2929 11.2071L15.7071 9.79289L13.9142 8L15.7071 6.20711L14.2929 4.79289L12.5 6.58579L10.7071 4.79289L9.29289 6.20711Z" fill="#000000" />
			</symbol>
			<symbol id="low">
				<path d="M6 1H8V15H6L2 11H0V5H2L6 1Z" fill="#000000" />
			</symbol>
			<symbol id="med">
				<path d="M8 1H6L2 5H0V11H2L6 15H8V1Z" fill="#000000" />
				<path d="M12 8C12 9.10457 11.1046 10 10 10V6C11.1046 6 12 6.89543 12 8Z" fill="#000000" />
			</symbol>
			<symbol id="high">
				<path d="M6 1H8V15H6L2 11H0V5H2L6 1Z" fill="#000000" />
				<path d="M14 8C14 5.79086 12.2091 4 10 4V2C13.3137 2 16 4.68629 16 8C16 11.3137 13.3137 14 10 14V12C12.2091 12 14 10.2091 14 8Z" fill="#000000" />
				<path d="M12 8C12 9.10457 11.1046 10 10 10V6C11.1046 6 12 6.89543 12 8Z" fill="#000000" />
			</symbol>
			<use href={"#" + icon()}></use>
		</svg >
	)
}
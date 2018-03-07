module.exports = class extends think.Mongo {
	addUserInfo(userInfo) {
		this.add({
			name: userInfo.name,
			nameType: userInfo.nameType,
			phone: userInfo.phone,
			roomSize: userInfo.roomSize,
			price: userInfo.price,
			time: new Date()
		});
	}

	async listUserInfo(dateInfo) {
		return await this.where({
			$and: [
				{"time": {$gte: dateInfo.startDate}},
				{"time": {$lte: dateInfo.endDate}}
			]
		}).select();
	}
};
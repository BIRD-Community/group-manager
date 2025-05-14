class RobloxCloud {
	constructor(key) {
		this.key = key
	}
	/**List Group Join Requests
	 * @param {number} limit 
	 * @param {string} group 
	 * @returns 
	 */
	getJoinRequests(limit = 20, group) {
		return fetch(`https://apis.roblox.com/cloud/v2/groups/${group}/join-requests?maxPageSize=${limit}`, {
			headers: {
				"x-api-key": this.key,
				"Content-Type": "application/json"
			}
		})
	}
	/**Declines a join request.
	* @param {string} joinRequest 
	* @param {string|number} group 
	* @returns 
	*/
	decline(joinRequest, group) {
		return fetch(`https://apis.roblox.com/cloud/v2/groups/${group}/join-requests/${joinRequest}:decline`, {
			headers: {
				"x-api-key": this.key,
				"Content-Type": "application/json"
			},
			method: "POST",
			body: `{}`
		})
	}
	/**Accepts a join request.
	 * @param {string} joinRequest 
	 * @param {string|number} group 
	 * @returns 
	 */
	approve(joinRequest, group) {
		return fetch(`https://apis.roblox.com/cloud/v2/groups/${group}/join-requests/${joinRequest}:accept`, {
			headers: {
				"x-api-key": this.key,
				"Content-Type": "application/json"
			},
			method: "POST",
			body: `{}`
		})
	}
}

const tempArray = [1568383344, 543909005, 74171242, 152730735, 219801956, 33280731, 279679144, 332248500, 5600283, 4988836573, 1320922, 1313129, 51645737, 112488179, 37607, 107814380, 1285779271, 5279257965, 4088248612, 205648496, 169297616]

class GroupManager {
	/**
	 * 
	 * @param {RobloxCloud} cloudApi 
	 */
	constructor(cloudApi, group) {
		this.api = cloudApi
		this.group = group
		this.interval = setInterval(() => {
			this.check()
		}, 60000)
		this.check()
	}
	async check() {
		try {
			const response = await (await this.api.getJoinRequests(20, this.group)).json()
			// console.log(response)
			for (const joinRequest of response.groupJoinRequests) {
				const joinRequestPath = joinRequest.user
				if (tempArray.some(userId => `users/${userId}` == joinRequestPath)) {
					console.log("Accepting", joinRequestPath)
					this.api.approve(joinRequestPath.split("/")[1], this.group).catch(err => console.error("Failed", err))
				} else {
					console.log("Rejecting", joinRequestPath)
					this.api.decline(joinRequestPath.split("/")[1], this.group).catch(err => console.error("Failed", err))
				}
			}
		} catch (error) {
			console.error(error)
		}
	}
}

module.exports = { GroupManager, RobloxCloud }
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Schedule from ".";

let container = null;
beforeEach(() => {
	// setup a DOM element
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	// cleanup after tests
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});
describe("Schedule component", () => {
	it("renders data correctly", async () => {
		const mockShifts = { data: [
			{
				"id": "1240",
				"status": "POSTED",
				"startDatetime": "2020-08-21T09:30:00+00:00",
				"endDatetime": "2020-08-21T20:30:00+00:00",
				"applicationIds": [
					5512,
					5517,
					5519,
					5590
				],
				"practice": {
					"id": "11812",
					"name": "The fantastic GP Surgery"
				},
				"locum": null,
				"hourlyRate": 115,
				"staffType": "gp",
				"staffTypeId": "1"
			},
			{
				id: "1241",
				status: "POSTED",
				locum: null,
				staffType: "Practice Nurse",
			},
			{
				id: "1234",
				status: "POSTED",
				locum: {},
				staffType: "gp",
			},
			{
				id: "2345",
				status: "DRAFT",
				locum: null,
				staffType: "gp",
			}
		] };
		jest.spyOn(global, "fetch").mockImplementation(() =>
			Promise.resolve({
				json: () => Promise.resolve( mockShifts )
			})
		);
		
		// Use the asynchronous version of act to apply resolved promises
		await act(async () => {
			render(<Schedule />, container);
		});
		
		// format data
		const item = mockShifts.data[0];
		const time = `${new Date( item.startDatetime ).toLocaleTimeString([], { timeStyle: 'short' })} - ${new Date(item.endDatetime).toLocaleTimeString([], {timeStyle: 'short'})}`;
		
		// make sure correct elements are rendered (only one should match all the criteria)
		expect(container.querySelectorAll("li").length).toBe(1);
		
		expect(container.querySelector("[data-test=practice-name]").textContent).toBe(item.practice.name);
		expect(container.querySelector("[data-test=date]").textContent).toBe(new Date(item.startDatetime).toLocaleDateString());
		expect(container.querySelector("[data-test=time]").textContent).toBe(time);
		expect(container.querySelector("[data-test=rate]").textContent).toContain(item.hourlyRate);
		expect(container.querySelector("[data-test=applications]").textContent).toBe(item.applicationIds.length.toString());
		
		global.fetch.mockRestore();
	});
});
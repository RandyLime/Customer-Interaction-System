import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Dropdown from "@/Components/Dropdown";

export default function Add() {
    const { data, setData, post, errors, processing } = useForm({
        game_type: '',
        reset_time: '',
        isWeekly: 0
    });


    function submit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("game_type", data.game_type);
        formData.append("reset_time", data.reset_time);
        formData.append("isWeekly", data.isWeekly);

        post("/admin/resettimes/add", {
            data: formData,
            forceFormData: true,
        });
    }

    return (
        <AdminLayout
            title="Add Reset Timer"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Reset Timers", url: "/admin/resettimes" },
                { label: "Add Reset Timer" },
            ]}
        >
            <Head title="Add Reset Timer" />
            <div className="p-4 bg-white shadow-md rounded-lg">
                <div className="mx-auto">
                    <form className="flex flex-col gap-4" onSubmit={submit}>
                        {/* Game Type */}
                        <div>
                            <label className="font-bold block mb-2">Game Type</label>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="border px-4 py-2 rounded bg-gray-200 w-full text-left"
                                    >
                                        {data.game_type || "Select Game Type"}
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Button onClick={() => setData("game_type", "mission")}>
                                        Mission
                                    </Dropdown.Button>
                                    <Dropdown.Button onClick={() => setData("game_type", "wheel")}>
                                        Wheel
                                    </Dropdown.Button>
                                </Dropdown.Content>
                            </Dropdown>
                            {errors.game_type && <div className="text-red-500 text-sm mt-1">{errors.game_type}</div>}
                        </div>

                        {/* Reset Time */}
                        <div>
                            <label className="font-bold block mb-2">Reset Time (HH:MM:SS)</label>
                            <input
                                type="time"
                                step="1"
                                value={data.reset_time}
                                onChange={(e) => setData("reset_time", e.target.value)}
                                className="border px-4 py-2 rounded w-full"
                            />
                            {errors.reset_time && <div className="text-red-500 text-sm mt-1">{errors.reset_time}</div>}
                        </div>

                        {/* Is Weekly */}
                        <div>
                            <label className="font-bold block mb-2">Is Weekly?</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="isWeekly"
                                        value="1"
                                        checked={data.isWeekly === 1}
                                        onChange={() => setData("isWeekly", 1)}
                                    />
                                    Yes
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="isWeekly"
                                        value="0"
                                        checked={data.isWeekly === 0}
                                        onChange={() => setData("isWeekly", 0)}
                                    />
                                    No
                                </label>
                            </div>
                            {errors.isWeekly && <div className="text-red-500 text-sm mt-1">{errors.isWeekly}</div>}
                        </div>

                        {/* Example table */}
                        <p className="mt-4 font-semibold">Example table:</p>
                        <table className="table w-full border border-gray-300 mt-2">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="font-bold border px-2 py-1">Game Type</th>
                                    <th className="font-bold border px-2 py-1">Start Date</th>
                                    <th className="font-bold border px-2 py-1">End Date</th>
                                    <th className="font-bold border px-2 py-1">Reset Day</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-2 py-1">{data.game_type}</td>
                                    <td className="border px-2 py-1">{data.start_date}</td>
                                    <td className="border px-2 py-1">{data.end_date}</td>
                                    <td className="border px-2 py-1">{data.reset_day}</td>
                                </tr>
                            </tbody>
                        </table>

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
                            disabled={processing}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

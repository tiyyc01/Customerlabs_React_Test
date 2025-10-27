import React, { useState } from "react";
import "./SegmentModal.css";

const schemaOptions = [
    { label: "First Name", value: "first_name", type: "user" },
    { label: "Last Name", value: "last_name", type: "user" },
    { label: "Gender", value: "gender", type: "user" },
    { label: "Age", value: "age", type: "user" },
    { label: "Account Name", value: "account_name", type: "group" },
    { label: "City", value: "city", type: "group" },
    { label: "State", value: "state", type: "group" },
];

const SegmentModal = ({ onClose }) => {
    const [segmentName, setSegmentName] = useState("");
    const [selectedSchema, setSelectedSchema] = useState("");
    const [addedSchemas, setAddedSchemas] = useState([]);

    const handleAddSchema = () => {
        if (selectedSchema && !addedSchemas.includes(selectedSchema)) {
            setAddedSchemas([...addedSchemas, selectedSchema]);
            setSelectedSchema("");
        }
    };

    const handleRemoveSchema = (index) => {
        const updated = [...addedSchemas];
        updated.splice(index, 1);
        setAddedSchemas(updated);
    };

    const handleSchemaChange = (index, value) => {
        const updated = [...addedSchemas];
        updated[index] = value;
        setAddedSchemas(updated);
    };

    const handleSaveSegment = async () => {
        const data = {
            segment_name: segmentName,
            schema: addedSchemas.map((key) => ({
                [key]: schemaOptions.find((opt) => opt.value === key)?.label,
            })),
        };

        console.log("Sending data:", data);

        try {
            await fetch("https://webhook.site/bbd647a0-d0b2-4ab4-9411-75ca7e098edb", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                mode: "no-cors",
                body: JSON.stringify(data),
            });

            alert(
                "Segment saved successfully! Check your webhook inbox to see the JSON payload."
            );
            onClose();
        } catch (error) {
            console.error("Error sending data:", error);
            alert("Something went wrong while saving the segment.");
        }
    };

    const availableOptions = schemaOptions.filter(
        (option) => !addedSchemas.includes(option.value)
    );

    const getColorDot = (type) => {
        return type === "user" ? "green-dot" : "pink-dot";
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <span>← Saving Segment</span>
                </div>

                <div className="modal-body">
                    <label>Enter the Name of the Segment</label>
                    <input
                        type="text"
                        value={segmentName}
                        onChange={(e) => setSegmentName(e.target.value)}
                        placeholder="Name of the segment"
                    />

                    <p className="hint">
                        To save your segment, you need to add the schemas to build the query
                    </p>

                    <div className="traits-legend">
                        <span>
                            <span className="green-dot"></span> - User Traits
                        </span>
                        <span>
                            <span className="pink-dot"></span> - Group Traits
                        </span>
                    </div>

                    <div className="schema-box">
                        {addedSchemas.map((schema, index) => {
                            const selectedOpt = schemaOptions.find(
                                (opt) => opt.value === schema
                            );
                            return (
                                <div className="schema-row" key={index}>
                                    <span className={getColorDot(selectedOpt.type)}></span>
                                    <select
                                        value={schema}
                                        onChange={(e) => handleSchemaChange(index, e.target.value)}
                                    >
                                        {schemaOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        className="remove-btn"
                                        onClick={() => handleRemoveSchema(index)}
                                    >
                                        –
                                    </button>
                                </div>
                            );
                        })}

                        <div className="schema-row">
                            <span className="gray-dot"></span>
                            <select
                                value={selectedSchema}
                                onChange={(e) => setSelectedSchema(e.target.value)}
                            >
                                <option value="">Add schema to segment</option>
                                {availableOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <p className="add-link" onClick={handleAddSchema}>
                            + Add new schema
                        </p>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="save-btn" onClick={handleSaveSegment}>
                        Save the Segment
                    </button>
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SegmentModal;

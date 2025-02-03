import { Address } from "../types";

const addresses = [
    {
        id: "addr-001",
        name: "Bibhu Prasad Sahoo",
        phoneNumber: "+917735605546",
        houseNumber: "Tetra Boys Hostel",
        street: "Tangi",
        landmark: "Near DRIEMS",
        city: "Cuttack",
        district: "Cuttack",
        state: "Odisha",
        pincode: "754022",
        isDefault: true,
        userId: "user-001"
    },
    {
        id: "addr-002",
        name: "Bibhu Prasad Sahoo",
        phoneNumber: "+917735605546",
        houseNumber: "C-61",
        street: "Tangi",
        landmark: "Near Tangi CHC",
        city: "Cuttack",
        district: "Cuttack",
        state: "Odisha",
        pincode: "754022",
        isDefault: false,
        userId: "user-001"
    },
    {
        id: "addr-003",
        name: "Alisha Sahoo",
        phoneNumber: "+917735605546",
        houseNumber: "DRIEMS Girls Hostel",
        street: "Tangi",
        landmark: "DRIEMS",
        city: "Cuttack",
        district: "Cuttack",
        state: "Odisha",
        pincode: "754022",
        isDefault: true,
        userId: "user-002"
    },
    {
        id: "addr-004",
        name: "Emily Brown",
        phoneNumber: "6543210987",
        houseNumber: "101",
        street: "Fifth Avenue",
        landmark: "Next to Coffee Shop",
        city: "San Francisco",
        district: "Bay Area",
        state: "California",
        pincode: "94103",
        isDefault: false,
        userId: "user-004"
    },
    {
        id: "addr-005",
        name: "Robert Wilson",
        phoneNumber: "5432109876",
        houseNumber: "202",
        street: "Broadway",
        landmark: "Near Train Station",
        city: "Seattle",
        district: "Downtown",
        state: "Washington",
        pincode: "98101",
        isDefault: true,
        userId: "user-005"
    }
] as Address[];

export default addresses;

LLD of Parking lot

Step 1: Clarify Requirements

Functional Requirement

Entry flow
- Vehicle arrives at the gate
- Generate a ticket and assign the parking slot based on vehicle type
- Mark slot as occupied
- Return entry result with success/failure status

Exit flow
- User show ticket at gate
- Calculate the fee based on pricing rules ( flat or hourly )
- process payment through payment gateway
- Release slot and generate receipt
- Return exit result with success/failure status

Admin Configuration
- Add/Edit/Delete floor and slot
- View current parking slot status
- Add/Edit/Delete pricing rules
- Add/Edit/Delete vehicle type supported by parking

NON-FUNCTIONAL REQUIREMENT
- Scalability
- Consistency
- Availability
- Latency
- Extensibility
- Security

Edge Cases
- Payment fail during exit - retry or manual payment
- Ticket lost - alow admin to override

Step 2: Identify Core Entities

Vehicle
  - id (uuid)
  - licensePlate (string)
  - vehicleType (Enum) ( TWO_WHEELER, FOUR_WHEELER)
  
ParkingSlot
  - id (uuid)
  - floorId ( relation to floor table ) (string)
  - slotType (Enum) ( TWO_WHEELER, FOUR_WHEELER)
  - isOccupied (boolean)
  - isActive (boolean)

Floor
  - id (uuid)
  - floorNumber (number)

Ticket
  - id (uuid)
  - vehicleId
  - slotId
  - entryTime
  - isActive

Receipt
  - id (uuid)
  - ticketId
  - exitTime
  - totalFee
  - paymentStatus

PricingRule
  - id (uuid)
  - vehicleType
  - ratePerHour
  - flatRate
  - ruleType

Payment
 - id (uuid)
 - ticketId
 - gateway
 - status
 - amount

EntryResult / ExitResult
  - id (uuid)
  - message
  - status
  - data


Step 3: Visual Interaction Flows

Entry Flow
  - Vehicle arrives
  - Slot allocated
  - Ticket generated
  - Slot marked as occupied
  - entry result

Exit Flow
  - Ticket scanned
  - Fee calculated
  - Payment processed (with retries)
  - Receipt generated
  - Slot released
  - Ticket deactivated
  - exit result

Admin Flow
  - Add floor
  - Add slot
  - Update pricing

Step 4: Defines Class Structures & Relationships




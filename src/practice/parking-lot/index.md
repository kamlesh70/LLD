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

Layers of Architecture
We will design the architecture layers of the system in a structured way, ensuring separation of concerns and modularity. The system will be organized into the following layers:

Client Layer → Controller Layer → Service Layer → Repository Layer → Domain Layer

Each layer has a distinct role:
The Client Layer is responsible for user interaction and presenting information to the user.
The Controller Layer handles incoming requests from the client and delegates the tasks to the appropriate service.
The Service Layer contains the business logic, such as ticket generation and fee calculation.
The Repository Layer manages data access and persistence.
The Domain Layer defines the core entities like vehicles, slots, tickets, etc.

Controllers
  - EntryController.enterVehicle()
  - ExitController.exitVehicle()
  - AdminController.addFloor(), addSlot(), updatePricing()

Services
The system will include several services responsible for core business operations. Each service will handle specific tasks:
  - TicketService: Generates and retrieves tickets
  - SlotService: Allocates and releases parking slots
  - PricingService: Calculates fees based on parking duration and type
  - PaymentService: Processes payments for parking tickets
  - ReceiptService: Generates receipts after payment
  - AdminService: Handles administrative tasks like adding floors, updating pricing, and slot management

Repositories
The Repositories will abstract data access for the core entities like TicketRepository, SlotRepository, FloorRepository, PricingRuleRepository, PaymentRepository. Each repository will be responsible for:
  - Managing CRUD operations (Create, Read, Update, Delete) for Tickets, Slots, Floors, Pricing Rules, and Payments
  - Providing methods to query and persist data efficiently

Interfaces and Adapters
We will use interfaces and adapters to integrate external services: PaymentGatewayAdapter, RazorpayAdapter, StriperAdapter. The adapter pattern will allow for:
  - Abstracting payment gateway interactions
  - Easily switching or adding new payment services like Razorpay or Stripe by implementing the PaymentGatewayAdapter interface

Step 5: Implement Core Use Cases
The system will be designed around key use cases, with each use case mapped to corresponding service and repository methods.

Entry Use Case
enterVehicle() → SlotService.allocateSlot() → TicketService.generateTicket() → TicketRepository.save() → Return EntryResult

Exit Use Case:
exitVehicle() → Get Ticket → Calculate Fee → Process Payment (with retries) → Release Slot → Generate Receipt → Return ExitResult

Admin Use Cases:
addFloor() : Save new floor
addSlot() : Save new slot
updatePricing() : Update pricing rules
// Node class for Linked List
class Node {
    constructor(data, priority = 5) {
        this.data = data;
        this.priority = priority;
        this.next = null;
    }
}

// Linked List implementation
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
        this.operationCount = 0;
    }

    // Add a node at the beginning (O(1))
    addFirst(data, priority = 5) {
        const newNode = new Node(data, priority);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
        this.operationCount++;
        return newNode;
    }

    // Add a node at the end (O(n))
    addLast(data, priority = 5) {
        const newNode = new Node(data, priority);
        this.operationCount++;
        
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
        return newNode;
    }

    // Insert a node at a specific priority position (O(n))
    insertAtPriority(data, targetPriority) {
        const newNode = new Node(data, targetPriority);
        this.operationCount++;
        
        // If list is empty, just add as head
        if (!this.head) {
            this.head = newNode;
            this.size++;
            return newNode;
        }
        
        // If inserting at head (targetPriority is less than head's priority)
        if (targetPriority < this.head.priority) {
            newNode.next = this.head;
            this.head = newNode;
            this.size++;
            return newNode;
        }
        
        // Find the position to insert
        let current = this.head;
        while (current.next && current.next.priority < targetPriority) {
            current = current.next;
        }
        
        // Insert after current
        newNode.next = current.next;
        current.next = newNode;
        this.size++;
        return newNode;
    }

    // Remove the first node (O(1))
    removeFirst() {
        if (!this.head) {
            return null;
        }
        
        const removedNode = this.head;
        this.head = this.head.next;
        this.size--;
        this.operationCount++;
        return removedNode;
    }

    // Remove the last node (O(n))
    removeLast() {
        if (!this.head) {
            return null;
        }
        
        this.operationCount++;
        
        if (!this.head.next) {
            const removedNode = this.head;
            this.head = null;
            this.size--;
            return removedNode;
        }
        
        let current = this.head;
        while (current.next.next) {
            current = current.next;
        }
        
        const removedNode = current.next;
        current.next = null;
        this.size--;
        return removedNode;
    }

    // Search for a node (O(n))
    search(data) {
        let current = this.head;
        let index = 0;
        this.operationCount++;
        
        while (current) {
            if (current.data.toLowerCase() === data.toLowerCase()) {
                return { node: current, index };
            }
            current = current.next;
            index++;
        }
        
        return null;
    }

    // Remove node by priority (O(n))
    removeByPriority(priority) {
        if (!this.head) {
            return null;
        }
        
        this.operationCount++;
        
        // If head node has the priority
        if (this.head.priority === priority) {
            const removedNode = this.head;
            this.head = this.head.next;
            this.size--;
            return removedNode;
        }
        
        // Search for the node with matching priority
        let current = this.head;
        while (current.next) {
            if (current.next.priority === priority) {
                const removedNode = current.next;
                current.next = current.next.next;
                this.size--;
                return removedNode;
            }
            current = current.next;
        }
        
        return null; // Priority not found
    }

    // Get all nodes as array (for traversal display)
    toArray() {
        const result = [];
        let current = this.head;
        let index = 0;
        
        while (current) {
            result.push({
                data: current.data,
                priority: current.priority,
                index: index++
            });
            current = current.next;
        }
        
        return result;
    }

    // Clear the entire list
    clear() {
        this.head = null;
        this.size = 0;
        this.operationCount++;
    }

    // Get size
    getSize() {
        return this.size;
    }

    // Get operation count
    getOperationCount() {
        return this.operationCount;
    }

    // Check if empty
    isEmpty() {
        return this.size === 0;
    }
}


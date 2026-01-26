class ChatWidget {
    constructor() {
        this.isOpen = false;
        this.isMinimized = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createWidget();
        this.loadInitialMessages();
        this.bindEvents();
    }

    createWidget() {
        const widgetHTML = `
            <div id="chat-widget" class="chat-widget">
                <div class="chat-widget__container">
                    <div class="chat-widget__header">
                        <div class="chat-widget__header-info">
                            <div class="chat-widget__avatar">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                            </div>
                            <div class="chat-widget__header-text">
                                <h4>SingBD Support</h4>
                                <span class="chat-widget__status">Online</span>
                            </div>
                        </div>
                        <div class="chat-widget__header-actions">
                            <button class="chat-widget__whatsapp-btn" id="chat-whatsapp" title="Open WhatsApp">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                </svg>
                            </button>
                            <button class="chat-widget__minimize-btn" id="chat-minimize" title="Minimize">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 13H5v-2h14v2z"/>
                                </svg>
                            </button>
                            <button class="chat-widget__close-btn" id="chat-close" title="Close">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="chat-widget__body" id="chat-body">
                        <div class="chat-widget__messages" id="chat-messages"></div>
                        <div class="chat-widget__input-area">
                            <div class="chat-widget__input-wrapper">
                                <input type="text" id="chat-input" placeholder="Type a message..." class="chat-widget__input">
                                <button class="chat-widget__send-btn" id="chat-send">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chat-widget__toggle" id="chat-toggle">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                    </svg>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', widgetHTML);
    }

    loadInitialMessages() {
        this.addMessage({
            type: 'received',
            text: 'Hello! Welcome to SingBD. I\'m here to help you with apparel sourcing queries. How can I assist you today?',
            time: new Date()
        });

        // Add quick reply buttons
        this.addQuickReplies([
            'Product Categories',
            'Sourcing Process',
            'Quality Standards',
            'Contact Information'
        ]);
    }

    addQuickReplies(replies) {
        const quickRepliesHTML = `
            <div class="chat-widget__quick-replies">
                ${replies.map(reply => `
                    <button class="chat-widget__quick-reply" data-reply="${reply}">
                        ${reply}
                    </button>
                `).join('')}
            </div>
        `;
        this.addMessage({
            type: 'quick-replies',
            html: quickRepliesHTML,
            time: new Date()
        });
    }

    addMessage(message) {
        this.messages.push(message);
        this.renderMessage(message);
    }

    renderMessage(message) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `chat-widget__message chat-widget__message--${message.type}`;

        const time = message.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (message.type === 'quick-replies') {
            messageElement.innerHTML = message.html;
        } else {
            messageElement.innerHTML = `
                <div class="chat-widget__message-content">
                    <div class="chat-widget__message-text">${message.text}</div>
                    <div class="chat-widget__message-time">${time}</div>
                </div>
            `;
        }

        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    getAutomatedReply(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('product') || message.includes('category') || message.includes('categories')) {
            return {
                text: 'We offer a comprehensive range of product categories including:\n\n• Woven Tops (Shirts, Blouses, Tunics)\n• Coats & Jackets\n• Sportswear\n• Woven Bottoms (Pants, Shorts)\n• Knitwear\n• Homeware\n• Handicrafts\n• Accessories\n\nWould you like to know more about any specific category?',
                quickReplies: ['Woven Tops', 'Sportswear', 'Knitwear', 'Contact Sales']
            };
        }
        
        if (message.includes('sourcing') || message.includes('process') || message.includes('how')) {
            return {
                text: 'Our sourcing process is designed for efficiency and quality:\n\n1. **Initial Consultation** - We understand your requirements\n2. **Factory Selection** - We match you with certified manufacturers\n3. **Sample Development** - Prototypes and approvals\n4. **Production Management** - Quality control throughout\n5. **Shipping & Delivery** - Timely delivery to your location\n\nWould you like to discuss your specific sourcing needs?',
                quickReplies: ['Get Quote', 'Quality Standards', 'Lead Times', 'Contact Us']
            };
        }
        
        if (message.includes('quality') || message.includes('standard') || message.includes('qc')) {
            return {
                text: 'We maintain rigorous quality standards:\n\n• **Pre-production QC** - Material and sample testing\n• **In-line QC** - Production monitoring\n• **Final QC** - Comprehensive product inspection\n• **Certifications** - GOTS, OEKO-TEX, and more\n• **Compliance** - Social and environmental standards\n\nAll products undergo multiple quality checks before shipment.',
                quickReplies: ['Certifications', 'Testing Process', 'Get Quote', 'Contact QC Team']
            };
        }
        
        if (message.includes('contact') || message.includes('email') || message.includes('phone')) {
            return {
                text: 'Here\'s how you can reach us:\n\n📧 **Email**: info@singbd.com\n📞 **Phone**: +8801711594673\n📍 **Office**: 9th Floor, ANZ Huq Eleven Square, Plot #01, Road #11, Block #H, Banani, Dhaka-1213, Bangladesh\n\nOur team is available Monday-Friday, 9 AM - 6 PM BST.\n\nWould you like to schedule a consultation?',
                quickReplies: ['Schedule Meeting', 'Get Quote', 'WhatsApp', 'Email Us']
            };
        }
        
        if (message.includes('price') || message.includes('cost') || message.includes('quote')) {
            return {
                text: 'Pricing varies based on:\n\n• Product specifications\n• Order quantity\n• Material requirements\n• Production timeline\n• Quality standards\n\nTo get an accurate quote, please provide:\n- Product details\n- Estimated quantity\n- Timeline requirements\n\nI can connect you with our sales team for a detailed quote.',
                quickReplies: ['Get Quote', 'Product Details', 'Contact Sales', 'WhatsApp']
            };
        }
        
        if (message.includes('lead time') || message.includes('delivery') || message.includes('shipping')) {
            return {
                text: 'Our typical lead times:\n\n• **Sample Development**: 7-14 days\n• **Small Orders**: 4-6 weeks\n• **Medium Orders**: 6-8 weeks\n• **Large Orders**: 8-12 weeks\n\nLead times may vary based on:\n- Product complexity\n- Material availability\n- Production capacity\n\nWe always provide realistic timelines upfront.',
                quickReplies: ['Sample Request', 'Production Timeline', 'Get Quote', 'Contact Us']
            };
        }
        
        if (message.includes('whatsapp') || message.includes('wa')) {
            return {
                text: 'You can reach us on WhatsApp for quick responses:\n\n📱 **WhatsApp**: +8801711594673\n\nWe typically respond within 1-2 hours during business hours.\n\nWould you like me to provide more specific information about any of our services?',
                quickReplies: ['Product Categories', 'Get Quote', 'Quality Standards', 'Contact Info']
            };
        }

        // Default response
        return {
            text: 'Thank you for your message! I\'m here to help with apparel sourcing queries. You can ask me about:\n\n• Product categories and specifications\n• Sourcing process and timelines\n• Quality standards and certifications\n• Pricing and quotes\n• Contact information\n\nHow can I assist you further?',
            quickReplies: ['Product Categories', 'Sourcing Process', 'Get Quote', 'Contact Us']
        };
    }

    handleUserMessage(message) {
        // Add user message
        this.addMessage({
            type: 'sent',
            text: message,
            time: new Date()
        });

        // Simulate typing delay
        setTimeout(() => {
            const reply = this.getAutomatedReply(message);
            
            // Add bot reply
            this.addMessage({
                type: 'received',
                text: reply.text,
                time: new Date()
            });

            // Add quick replies if available
            if (reply.quickReplies) {
                this.addQuickReplies(reply.quickReplies);
            }
        }, 1000);
    }

    bindEvents() {
        // Toggle chat
        document.getElementById('chat-toggle').addEventListener('click', () => {
            this.toggleChat();
        });

        // WhatsApp button
        document.getElementById('chat-whatsapp').addEventListener('click', () => {
            this.openWhatsApp();
        });

        // Minimize chat
        document.getElementById('chat-minimize').addEventListener('click', () => {
            this.toggleMinimize();
        });

        // Close chat
        document.getElementById('chat-close').addEventListener('click', () => {
            this.closeChat();
        });

        // Send message
        document.getElementById('chat-send').addEventListener('click', () => {
            this.sendMessage();
        });

        // Enter key to send
        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Quick reply buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('chat-widget__quick-reply')) {
                const reply = e.target.dataset.reply;
                this.handleUserMessage(reply);
            }
        });


    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (message) {
            this.handleUserMessage(message);
            input.value = '';
        }
    }

    toggleChat() {
        const widget = document.getElementById('chat-widget');
        
        // If minimized, first unminimize, then open
        if (this.isMinimized) {
            this.isMinimized = false;
            widget.classList.remove('chat-widget--minimized');
            this.isOpen = true;
            widget.classList.add('chat-widget--open');
            this.adjustChatPosition();
            document.getElementById('chat-input').focus();
        } else {
            // Normal toggle behavior
            this.isOpen = !this.isOpen;
            
            if (this.isOpen) {
                widget.classList.add('chat-widget--open');
                this.adjustChatPosition();
                document.getElementById('chat-input').focus();
            } else {
                widget.classList.remove('chat-widget--open');
            }
        }
    }

    adjustChatPosition() {
        const widget = document.getElementById('chat-widget');
        const container = widget.querySelector('.chat-widget__container');
        
        // Reset any previous positioning and sizing
        container.style.left = '';
        container.style.right = '';
        container.style.maxWidth = '';
        
        // Always position chat to the left of the button
        container.style.right = '70px'; // 60px button width + 10px gap
        container.style.left = 'auto';
    }

    toggleMinimize() {
        const widget = document.getElementById('chat-widget');
        this.isMinimized = !this.isMinimized;
        
        if (this.isMinimized) {
            widget.classList.add('chat-widget--minimized');
        } else {
            widget.classList.remove('chat-widget--minimized');
        }
    }

    closeChat() {
        const widget = document.getElementById('chat-widget');
        this.isOpen = false;
        this.isMinimized = false;
        widget.classList.remove('chat-widget--open', 'chat-widget--minimized');
    }

    openWhatsApp() {
        const phoneNumber = '8801711594673';
        const message = 'Hello! I\'m interested in SingBD\'s apparel sourcing services.';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
}

// Initialize chat widget when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatWidget();
});

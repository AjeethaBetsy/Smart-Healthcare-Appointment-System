/**
 * Smart Healthcare Appointment System - Client Logic
 * Handles interactive doctor search/filtering, appointment booking engine,
 * live dashboard state updates, medical records downloads, notifications, & modals.
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initNavbarScroll();
    initMobileMenu();
    initNotificationCenter();
    initDoctorCatalog();
    initBookingForm();
    initMedicalRecords();
    initDashboard();
    initModals();
    initSmoothScroll();
});

/* ==========================================================================
   1. Application State & Sample Data
   ========================================================================== */
const state = {
    doctors: [
        {
            id: 'doc-1',
            name: 'Dr. Sarah Jenkins, MD',
            specialty: 'Cardiology',
            experience: '12+ Years Exp',
            rating: '4.9',
            reviews: 142,
            location: 'St. Jude Heart Center',
            photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
            slots: ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'],
            fee: '$120'
        },
        {
            id: 'doc-2',
            name: 'Dr. Marcus Vance, PhD',
            specialty: 'Neurology',
            experience: '15+ Years Exp',
            rating: '4.95',
            reviews: 198,
            location: 'Brain & Spine Institute',
            photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
            slots: ['10:00 AM', '01:00 PM', '03:30 PM'],
            fee: '$150'
        },
        {
            id: 'doc-3',
            name: 'Dr. Emily Watson, MD',
            specialty: 'Pediatrics',
            experience: '9+ Years Exp',
            rating: '4.88',
            reviews: 96,
            location: 'Sunrise Children Hospital',
            photo: 'https://images.unsplash.com/photo-1594824813566-78a1ed6a264a?auto=format&fit=crop&w=600&q=80',
            slots: ['08:30 AM', '11:00 AM', '02:30 PM', '05:00 PM'],
            fee: '$90'
        },
        {
            id: 'doc-4',
            name: 'Dr. Robert Sterling, MD',
            specialty: 'Orthopedics',
            experience: '14+ Years Exp',
            rating: '4.92',
            reviews: 165,
            location: 'Apex Bone & Joint Clinic',
            photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
            slots: ['09:30 AM', '01:30 PM', '04:00 PM'],
            fee: '$135'
        },
        {
            id: 'doc-5',
            name: 'Dr. Amanda Chen, MD',
            specialty: 'Dermatology',
            experience: '10+ Years Exp',
            rating: '4.90',
            reviews: 210,
            location: 'Glow Skin & Laser Clinic',
            photo: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=600&q=80',
            slots: ['10:30 AM', '02:00 PM', '05:30 PM'],
            fee: '$110'
        }
    ],
    appointments: [
        {
            id: 'APT-8921',
            doctorName: 'Dr. Sarah Jenkins, MD',
            specialty: 'Cardiology',
            date: '2026-07-28',
            time: '11:30 AM',
            status: 'Confirmed',
            type: 'Routine Cardiovascular Checkup',
            location: 'St. Jude Heart Center - Suite 402'
        },
        {
            id: 'APT-7412',
            doctorName: 'Dr. Amanda Chen, MD',
            specialty: 'Dermatology',
            date: '2026-08-04',
            time: '02:00 PM',
            status: 'Pending',
            type: 'Annual Skin Assessment',
            location: 'Glow Skin & Laser Clinic'
        }
    ],
    medicalRecords: [
        {
            date: '2026-06-15',
            title: 'Blood Pressure & Lipid Profile Report',
            doctor: 'Dr. Sarah Jenkins',
            category: 'Lab Reports',
            fileSize: '2.4 MB PDF',
            status: 'Normal'
        },
        {
            date: '2026-05-10',
            title: 'Cardiology Follow-up Prescription',
            doctor: 'Dr. Sarah Jenkins',
            category: 'Prescriptions',
            fileSize: '1.1 MB PDF',
            status: 'Active'
        },
        {
            date: '2026-03-22',
            title: 'Brain MRI Scan Summary & Diagnostics',
            doctor: 'Dr. Marcus Vance',
            category: 'Lab Reports',
            fileSize: '14.8 MB PDF',
            status: 'Reviewed'
        }
    ]
};

/* ==========================================================================
   2. Theme & Navigation Handling
   ========================================================================== */
function initThemeToggle() {
    const themeBtn = document.getElementById('themeToggleBtn');
    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        themeBtn.innerHTML = newTheme === 'dark' 
            ? `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`
            : `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;
        
        showToast(`Switched to ${newTheme.toUpperCase()} mode`, 'info');
    });
}

function initNavbarScroll() {
    const navbarWrapper = document.querySelector('.navbar-wrapper');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbarWrapper.classList.add('scrolled');
        } else {
            navbarWrapper.classList.remove('scrolled');
        }
    });
}

function initMobileMenu() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.nav-menu');
    if (!mobileBtn || !navMenu) return;

    mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

function initNotificationCenter() {
    const notifBtn = document.getElementById('notificationsBtn');
    if (!notifBtn) return;

    notifBtn.addEventListener('click', () => {
        showToast('🔔 Notifications: You have 2 upcoming checkups & 1 lab report ready!', 'info');
    });
}

/* ==========================================================================
   3. Doctor Catalog & Filtering
   ========================================================================== */
function initDoctorCatalog() {
    const grid = document.getElementById('doctorsGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('doctorSearchInput');
    const doctorSelect = document.getElementById('selectDoctor');

    if (!grid) return;

    function renderDoctors(doctorsToRender) {
        grid.innerHTML = '';
        if (doctorsToRender.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <h3>No Doctors Found</h3>
                <p>Try searching for a different specialty or doctor name.</p>
            </div>`;
            return;
        }

        doctorsToRender.forEach(doc => {
            const card = document.createElement('div');
            card.className = 'glass-card doctor-card';
            card.innerHTML = `
                <div class="doctor-img-box">
                    <img src="${doc.photo}" alt="${doc.name}">
                    <span class="status-badge">Available Today</span>
                </div>
                <div class="doctor-info">
                    <h3>${doc.name}</h3>
                    <div class="specialty-tag">${doc.specialty} • ${doc.experience}</div>
                    <div class="doctor-meta">
                        <span class="rating">★ ${doc.rating} (${doc.reviews})</span>
                        <span>${doc.location}</span>
                    </div>
                    <div class="time-slots">
                        ${doc.slots.map(s => `<span class="slot-pill available">${s}</span>`).join('')}
                    </div>
                    <button class="btn btn-primary btn-sm" style="width: 100%; margin-top: auto;" onclick="selectDoctorForBooking('${doc.id}')">
                        Book Appointment (${doc.fee})
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });

        // Also update select options in booking form
        if (doctorSelect) {
            doctorSelect.innerHTML = `<option value="">Choose a Doctor...</option>` + 
                state.doctors.map(d => `<option value="${d.id}">${d.name} (${d.specialty})</option>`).join('');
        }
    }

    renderDoctors(state.doctors);

    // Filter Buttons logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.filter;

            let filtered = state.doctors;
            if (category !== 'all') {
                filtered = state.doctors.filter(d => d.specialty.toLowerCase() === category.toLowerCase());
            }
            renderDoctors(filtered);
        });
    });

    // Search input logic
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = state.doctors.filter(d => 
                d.name.toLowerCase().includes(query) || 
                d.specialty.toLowerCase().includes(query) ||
                d.location.toLowerCase().includes(query)
            );
            renderDoctors(filtered);
        });
    }
}

// Global function to trigger booking from card
window.selectDoctorForBooking = function(doctorId) {
    const doc = state.doctors.find(d => d.id === doctorId);
    if (!doc) return;

    const doctorSelect = document.getElementById('selectDoctor');
    if (doctorSelect) {
        doctorSelect.value = doc.id;
        updateBookingSummary();
    }

    const bookingSection = document.getElementById('appointments');
    if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
    }

    showToast(`Selected ${doc.name} for booking. Choose your preferred date & time.`, 'info');
};

/* ==========================================================================
   4. Appointment Booking Form Engine
   ========================================================================== */
function initBookingForm() {
    const bookingForm = document.getElementById('appointmentForm');
    const doctorSelect = document.getElementById('selectDoctor');
    const dateInput = document.getElementById('selectDate');
    const timeSelect = document.getElementById('selectTime');

    // Set min date to today
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    if (doctorSelect) {
        doctorSelect.addEventListener('change', updateBookingSummary);
    }
    if (dateInput) {
        dateInput.addEventListener('change', updateBookingSummary);
    }
    if (timeSelect) {
        timeSelect.addEventListener('change', updateBookingSummary);
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const patientName = document.getElementById('patientName').value.trim();
            const phone = document.getElementById('patientPhone').value.trim();
            const docId = doctorSelect.value;
            const date = dateInput.value;
            const time = timeSelect.value;
            const reason = document.getElementById('visitReason').value.trim();

            if (!patientName || !phone || !docId || !date || !time) {
                showToast('Please fill out all required fields to confirm your appointment.', 'warning');
                return;
            }

            const doc = state.doctors.find(d => d.id === docId);

            // Create new appointment item
            const newAppointment = {
                id: 'APT-' + Math.floor(1000 + Math.random() * 9000),
                doctorName: doc ? doc.name : 'Specialist Doctor',
                specialty: doc ? doc.specialty : 'General',
                date: date,
                time: time,
                status: 'Confirmed',
                type: reason || 'General Consultation',
                location: doc ? doc.location : 'Main Medical Center'
            };

            state.appointments.unshift(newAppointment);

            // Trigger success UI & Modal
            showBookingConfirmationModal(newAppointment, patientName, phone);
            
            // Reset form
            bookingForm.reset();
            updateBookingSummary();

            // Refresh Dashboard UI
            initDashboard();
        });
    }
}

function updateBookingSummary() {
    const docId = document.getElementById('selectDoctor')?.value;
    const date = document.getElementById('selectDate')?.value;
    const time = document.getElementById('selectTime')?.value;

    const summaryDoc = document.getElementById('sumDoctor');
    const summaryDate = document.getElementById('sumDate');
    const summaryTime = document.getElementById('sumTime');
    const summaryFee = document.getElementById('sumFee');

    const doc = state.doctors.find(d => d.id === docId);

    if (summaryDoc) summaryDoc.textContent = doc ? doc.name : 'Not selected';
    if (summaryDate) summaryDate.textContent = date || 'Not selected';
    if (summaryTime) summaryTime.textContent = time || 'Not selected';
    if (summaryFee) summaryFee.textContent = doc ? doc.fee : '$0';
}

function showBookingConfirmationModal(apt, patientName, phone) {
    const modal = document.getElementById('confirmationModal');
    const body = document.getElementById('modalPassBody');

    if (modal && body) {
        body.innerHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div style="width: 60px; height: 60px; background: var(--health-green-light); color: var(--health-green); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1rem auto;">✓</div>
                <h2 style="font-size: 1.6rem;">Appointment Confirmed!</h2>
                <p style="color: var(--text-muted);">Booking Pass Code: <strong style="color: var(--primary-blue);">${apt.id}</strong></p>
            </div>
            <div style="background: var(--neutral-bg); padding: 1.2rem; border-radius: var(--radius-md); font-size: 0.95rem; margin-bottom: 1.5rem;">
                <p style="margin-bottom: 0.5rem;"><strong>Patient Name:</strong> ${patientName}</p>
                <p style="margin-bottom: 0.5rem;"><strong>Contact Phone:</strong> ${phone}</p>
                <p style="margin-bottom: 0.5rem;"><strong>Doctor:</strong> ${apt.doctorName} (${apt.specialty})</p>
                <p style="margin-bottom: 0.5rem;"><strong>Date & Time:</strong> ${apt.date} at ${apt.time}</p>
                <p><strong>Location:</strong> ${apt.location}</p>
            </div>
            <div style="display: flex; gap: 1rem;">
                <button class="btn btn-primary" style="flex: 1;" onclick="downloadReceipt('${apt.id}', '${patientName}')">Download Pass (PDF)</button>
                <button class="btn btn-outline" onclick="closeModal('confirmationModal')">Close</button>
            </div>
        `;
        modal.classList.add('active');
        showToast('Appointment booked successfully! Added to your dashboard.', 'success');
    }
}

window.downloadReceipt = function(aptId, name) {
    showToast(`Downloading Appointment Pass ${aptId} for ${name}...`, 'info');
    setTimeout(() => {
        showToast('Pass saved to your downloads folder.', 'success');
        closeModal('confirmationModal');
    }, 1200);
};

/* ==========================================================================
   5. Medical Records Navigation & Action
   ========================================================================== */
function initMedicalRecords() {
    const tableBody = document.getElementById('recordsTableBody');
    const tabBtns = document.querySelectorAll('.tab-btn');

    if (!tableBody) return;

    function renderRecords(category = 'all') {
        tableBody.innerHTML = '';
        let filtered = state.medicalRecords;
        if (category !== 'all') {
            filtered = state.medicalRecords.filter(r => r.category.toLowerCase().replace(/\s+/g, '') === category.toLowerCase());
        }

        if (filtered.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-muted);">No medical records found in this category.</td></tr>`;
            return;
        }

        filtered.forEach(rec => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${rec.date}</strong></td>
                <td>
                    <div style="font-weight: 600;">${rec.title}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">${rec.category} • ${rec.fileSize}</div>
                </td>
                <td>${rec.doctor}</td>
                <td><span class="badge badge-green">${rec.status}</span></td>
                <td>
                    <button class="btn btn-outline btn-sm" onclick="downloadMedicalRecord('${rec.title}')">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Download
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    renderRecords();

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderRecords(btn.dataset.tab);
        });
    });
}

window.downloadMedicalRecord = function(title) {
    showToast(`Downloading secure file: ${title}...`, 'info');
    setTimeout(() => {
        showToast(`Document decrypted & downloaded successfully.`, 'success');
    }, 1200);
};

/* ==========================================================================
   6. Patient Dashboard Preview Updates
   ========================================================================== */
function initDashboard() {
    const list = document.getElementById('dashAppointmentsList');
    const countBadge = document.getElementById('upcomingCount');

    if (!list) return;

    list.innerHTML = '';
    if (countBadge) countBadge.textContent = state.appointments.length;

    state.appointments.forEach(apt => {
        const item = document.createElement('div');
        item.className = 'appointment-item-dash';
        item.innerHTML = `
            <div>
                <div style="font-weight: 700; font-size: 1.05rem;">${apt.doctorName}</div>
                <div style="font-size: 0.85rem; color: var(--text-muted);">${apt.type} • ${apt.date} at ${apt.time}</div>
                <div style="font-size: 0.8rem; color: var(--primary-blue); font-weight: 600; margin-top: 0.2rem;">📍 ${apt.location}</div>
            </div>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
                <span class="badge ${apt.status === 'Confirmed' ? 'badge-green' : 'badge-blue'}">${apt.status}</span>
                <button class="btn btn-outline btn-sm" onclick="cancelAppointment('${apt.id}')">Reschedule</button>
            </div>
        `;
        list.appendChild(item);
    });
}

window.cancelAppointment = function(id) {
    showToast(`Reschedule request sent for appointment ${id}.`, 'info');
};

/* ==========================================================================
   7. Modals & Notifications Manager
   ========================================================================== */
function initModals() {
    const loginBtn = document.getElementById('loginNavBtn');
    const loginModal = document.getElementById('authModal');
    
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', () => {
            loginModal.classList.add('active');
        });
    }

    window.closeModal = function(modalId) {
        const target = document.getElementById(modalId);
        if (target) target.classList.remove('active');
    };
}

function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    if (type === 'success') toast.style.borderLeftColor = 'var(--health-green)';
    if (type === 'warning') toast.style.borderLeftColor = '#f59e0b';
    if (type === 'info') toast.style.borderLeftColor = 'var(--primary-blue)';

    toast.innerHTML = `
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

/* ==========================================================================
   8. Smooth Scroll
   ========================================================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

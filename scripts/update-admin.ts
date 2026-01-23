
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const newEmail = 'info@bagcilarbetonkalip.com';
    // Generating a strong password
    const newPassword = 'BGC.' + Math.random().toString(36).slice(-8) + '!2025';

    console.log('Updating admin user...');
    console.log(`New Email: ${newEmail}`);
    console.log(`New Password: ${newPassword}`);

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update existing admin or create new one
    // First try to find by old email or new email
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email: 'admin@bagcilar.com' }, // Old default
                { email: newEmail }
            ]
        }
    });

    if (existingUser) {
        await prisma.user.update({
            where: { id: existingUser.id },
            data: {
                email: newEmail,
                password: hashedPassword
            }
        });
        console.log('Admin user updated successfully.');
    } else {
        await prisma.user.create({
            data: {
                email: newEmail,
                password: hashedPassword,
                name: 'Admin',
                role: 'ADMIN'
            }
        });
        console.log('Admin user created successfully.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

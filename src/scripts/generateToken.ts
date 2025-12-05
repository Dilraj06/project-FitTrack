import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES } from '../config/jwt';

const [uid, role = 'user'] = process.argv.slice(2);

if (!uid) {
  console.error('Usage: npx ts-node src/scripts/generateToken.ts <uid> [role]');
  process.exit(1);
}

const payload = {
  uid,
  role,
};

const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
console.log(token);

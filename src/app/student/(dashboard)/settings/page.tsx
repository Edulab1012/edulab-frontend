import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export default function Page() {
  return (
    <div>

      <div className="px-10 pt-30">
        <Card>
          <CardContent>
            <CardHeader className="text-3xl font-light leading-8 mb-5"> Багш нарын жагсаалт</CardHeader>
            <div className="grid grid-cols-5 gap-5">
              <Card>
                <CardContent>
                  <CardHeader>Сурагч Арии</CardHeader>
                  <div>
                    <Image
                      alt="student.profile"
                      src={"/logo-back.svg"}
                      width={150}
                      height={450}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <CardHeader>Сурагч Арии</CardHeader>
                  <div>
                    <Image
                      alt="student.profile"
                      src={"/logo-back.svg"}
                      width={150}
                      height={450}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <CardHeader>Сурагч Арии</CardHeader>
                  <div>
                    <Image
                      alt="student.profile"
                      src={"/logo-back.svg"}
                      width={150}
                      height={450}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <CardHeader>Сурагч Арии</CardHeader>
                  <div>
                    <Image
                      alt="student.profile"
                      src={"/logo-back.svg"}
                      width={150}
                      height={450}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <CardHeader>Сурагч Арии</CardHeader>
                  <div>
                    <Image
                      alt="student.profile"
                      src={"/logo-back.svg"}
                      width={150}
                      height={450}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <CardHeader>Сурагч Арии</CardHeader>
                  <div>
                    <Image
                      alt="student.profile"
                      src={"/logo-back.svg"}
                      width={150}
                      height={450}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <CardHeader>Сурагч Арии</CardHeader>
                  <div>
                    <Image
                      alt="student.profile"
                      src={"/logo-back.svg"}
                      width={150}
                      height={450}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <CardHeader>Сурагч Арии</CardHeader>
                  <div>
                    <Image
                      alt="student.profile"
                      src={"/logo-back.svg"}
                      width={150}
                      height={450}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
